import { IsNotEmpty, IsString, IsMongoId, IsNumber } from 'class-validator';

export class sectorTemperatureDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly monthId: string;
    @IsNotEmpty()
    @IsNumber()
    readonly min: number;
    @IsNotEmpty()
    @IsNumber()
    readonly max: number;
    @IsNotEmpty()
    @IsNumber()
    readonly average: number;
}
