import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDTO } from '../common/dtos/loginUser.dto';
import { UserService } from '../core/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, ISesion, IPayload, IAuthResponse } from '../common/interfaces/interfaces';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../database/model-names';
import { Model } from 'mongoose';
import { sesionDTO } from '../common/dtos/sesion.dto';
import { SignUpDTO } from '../common/dtos/signup.dto';
import * as moment from 'moment';

@Injectable()
export class AuthService {
    private expTime = this.config.get('JWT_TOKEN_EXP');
    constructor(
        @InjectModel(modelName.SESION) private sesionModel: Model<ISesion>,
        @InjectModel(modelName.USER) private userModel: Model<IUser>,
        private userService: UserService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}
    public async login(loginAttempt: LoginUserDTO) {
        const userToAttempt = await this.userService.findOneByEmail(loginAttempt.email);
        if (!userToAttempt) {
            throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
        }
        if (await userToAttempt.comparePassword(loginAttempt.password)) {
            const auth = this.createJwtPayload(userToAttempt);
            await this.sesionLogger({user_id: userToAttempt._id, token: auth.access_token, expireAt: moment().add( this.expTime, 'seconds') });
            return auth;
        } else {
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }
    }
    public async register(RegisterAttempt: SignUpDTO) {
        const isMatch = await this.userService.findOneByEmail(RegisterAttempt.email);
        if (isMatch) {
            throw new HttpException('Email Already Taken', HttpStatus.BAD_REQUEST);
        } else {
            const createdUser = new this.userModel(RegisterAttempt);
            await createdUser.save();
            const auth = this.createJwtPayload(createdUser);
            await this.sesionLogger({user_id: createdUser._id, token: auth.access_token, expireAt: moment().add( this.expTime, 'seconds') });
            return auth;
        }
    }
    public async logout( token: string ): Promise<ISesion> {
        return new Promise( async (resolve, reject) => {
            try {
                const blacklisted = await this.sesionModel.findOneAndUpdate({ token }, { blacklist: true });
                if (!blacklisted) {
                   reject('token not found');
                }
                resolve(blacklisted);
            } catch (error) {
                reject(error);
            }
        });
    }
    public async validateUserToken( payload: IPayload, token: string ): Promise<IUser> {
        return new Promise( async (resolve, reject) => {
            try {
                console.log(payload);
                await this.checkBlackList(token);
                const user = await this.userService.findById(payload.sub.id);
                if (!user) {
                    reject('user not found');
                }
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    public async checkBlackList( token: string ): Promise<string> {
        return new Promise( async (resolve, reject) => {
            const sesion = await this.sesionModel.findOne({token});
            if (sesion) {
                if (sesion.blacklist) {
                    reject('token is blacklisted');
                } else {
                    resolve('token is okey');
                }
            } else {
                reject('token not found');
            }
        });
    }
    private createJwtPayload(user: IUser): IAuthResponse {
        const token = this.jwtService.sign({sub: {id: user._id}});
        return {
            expiresIn: this.expTime,
            access_token: token,
        };
    }
    private async sesionLogger(sesion: sesionDTO): Promise<ISesion> {
        const createdLog = new this.sesionModel(sesion);
        return await createdLog.save();
    }
}
