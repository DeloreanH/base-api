import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDTO } from '../common/dtos/loginUser.dto';
import { UserService } from '../core/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, ISesion, IPayload } from '../common/interfaces/interfaces';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../database/model-names';
import { Model } from 'mongoose';
import { sesionDTO } from '../common/dtos/sesion.dto';
import moment = require('moment');
import { SignUpDTO } from '../common/dtos/signup.dto';

@Injectable()
export class AuthService {
    private expTime = this.config.get('JWT_TOKEN_EXP');
    constructor(
        @InjectModel(modelName.SESION) private sesionModel: Model<ISesion>,
        @InjectModel(modelName.USER) private userModel: Model<IUser>,
        private userService: UserService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {

    }
    public async login(loginAttempt: LoginUserDTO) {
        const userToAttempt = await this.userService.findOneByEmail(loginAttempt.email);
        if (!userToAttempt) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        if (await userToAttempt.comparePassword(loginAttempt.password)) {
            const auth = this.createJwtPayload(userToAttempt);
            await this.sesionLogger({user_id: userToAttempt._id, token: auth.token, expireAt: moment().add( this.expTime, 'seconds') });
            return auth;
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
    public async register(RegisterAttempt: SignUpDTO) {
        const isMatch = await this.userService.findOneByEmail(RegisterAttempt.email);
        console.log(RegisterAttempt);
        if (isMatch) {
            throw new HttpException('Email Already Taken', HttpStatus.BAD_REQUEST);
        } else {
            const createdUser = new this.userModel(RegisterAttempt);
            await createdUser.save();
            const auth = this.createJwtPayload(createdUser);
            await this.sesionLogger({user_id: createdUser._id, token: auth.token, expireAt: moment().add( this.expTime, 'seconds') });
            return auth;
        }
    }
    public async logout( token: string ): Promise<ISesion> {
        return new Promise( async (resolve, reject) => {
            const blacklisted = await this.sesionModel.findOneAndUpdate({ token }, { blacklist: true });
            if (!blacklisted) {
               reject('token not found');
            }
            resolve(blacklisted);
        });
    }
    public async validateUserToken( payload: IPayload, token: string ): Promise<IUser | null> {
        return new Promise( async (resolve, reject) => {
            const sesion = await this.sesionModel.findOne({token});
            if (!sesion.blacklist) {
               reject(null);
            }
            const user = await this.userService.findById(payload.sub._id);
            if (!user) {
                reject(null);
            }
            resolve(user);
        });
    }
    private createJwtPayload(user: IUser): { expiresIn: string , token: string} {
        const token = this.jwtService.sign({id: user._id, email: user.email, role: user.role});
        return {
            expiresIn: this.expTime,
            token,
        };
    }
    private async sesionLogger(sesion: sesionDTO): Promise<ISesion> {
        const createdLog = new this.sesionModel(sesion);
        return await createdLog.save();
    }
}
