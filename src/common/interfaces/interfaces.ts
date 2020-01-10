import { Document} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IPayload {
    exp: number;
    iat: number;
    sub: IUser;
}

export interface ISesion extends Document {
    user_id: string;
    token: string;
    blacklist: boolean;
    created: Date;
    expireAt: Date;
}
