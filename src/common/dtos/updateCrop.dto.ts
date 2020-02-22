import { IsNotEmpty, IsString, IsMongoId, IsNumber, IsArray } from 'class-validator';

export class updateCropDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly scientificName: string;
    @IsNotEmpty()
    @IsNumber()
    readonly phSince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly phUntil: number;
    @IsNotEmpty()
    @IsNumber()
    readonly temperatureSince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly temperatureUntil: number;
    @IsNotEmpty()
    @IsNumber()
    readonly altitudeSince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly altitudeUntil: number;
    @IsNotEmpty()
    @IsNumber()
    readonly hoursSince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly hoursUntil: number;
    @IsNotEmpty()
    @IsNumber()
    readonly typographySince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly typographyUntil: number;
    @IsNotEmpty()
    @IsNumber()
    readonly humiditySince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly humidityUntil: number;
    @IsNotEmpty()
    @IsNumber()
    readonly conductivitySince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly conductivityUntil: number;
    @IsNotEmpty()
    @IsNumber()
    readonly organicMaterialMinPercentage: number;
    @IsNotEmpty()
    @IsNumber()
    readonly organicMaterialMaxPercentage: number;
    @IsNotEmpty()
    @IsArray()
    readonly texturesId: string[];
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly weatherId: string;
}