import { Document} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: string;
    deleted: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IPayload {
    exp: number;
    iat: number;
    sub: {id: string};
}

export interface ISesion extends Document {
    user_id: string;
    token: string;
    blacklist: boolean;
    created: Date;
    expireAt: Date;
}

export interface IAuthResponse {
    expiresIn: string;
    access_token: string;
    user: IUser;
}
export interface IDocument extends Document {
    name: string;
    path: string;
    cropId: string;
}

export interface IPasswordReset extends Document {
    user_id: string;
    uuid: string;
    created: Date;
    expireAt: Date;
}

export interface ITexture extends Document {
    name: string;
    deleted: boolean;
}

export interface IWeather extends Document {
    name: string;
    deleted: boolean;
}

export interface ICrop extends Document {
     name: string;
     scientificName: string;
     phSince: number;
     phUntil: number;
     temperatureSince: number;
     temperatureUntil: number;
     altitudeSince: number;
     altitudeUntil: number;
     hoursSince: number;
     hoursUntil: number;
     typographySince: number;
     typographyUntil: number;
     humiditySince: number;
     humidityUntil: number;
     conductivitySince: number;
     conductivityUntil: number;
     documentId: string;
     organicMaterialMinPercentage: number;
     organicMaterialMaxPercentage: number;
     texturesId: string[];
     weatherId: string;
     deleted: boolean;
}

export interface IStudy extends Document {
    texturesId: string;
    sectorId: string;
    locationId: string;
    userId: string;
    month: number;
    name: string;
    ph: number;
    mo: number;
    ce: number;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface ILocation extends Document {
    sectorId: string;
    name: string;
    ASNM: number;
    texturesIds: string[];
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISector extends Document {
    name: string;
    pendingSince: number;
    pendingUntil: number;
    weatherId: string;
    sectorHumidities: ISectorHumidity[];
    sectorLights: ISectorLight[];
    sectorTemperatures: ISectorTemperature[];
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISectorHumidity {
    month: number;
    min: number;
    max: number;
}
export interface ISectorLight {
    month: number;
    min: number;
    max: number;
}
export interface ISectorTemperature {
    month: number;
    min: number;
    max: number;
}
