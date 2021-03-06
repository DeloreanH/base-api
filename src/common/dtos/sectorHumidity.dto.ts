import { IsNotEmpty, IsNumber } from 'class-validator';

export class sectorHumidityDTO {
    @IsNotEmpty()
    @IsNumber()
    readonly month: number;
    @IsNotEmpty()
    @IsNumber()
    readonly min: number;
    @IsNotEmpty()
    @IsNumber()
    readonly max: number;
    // @IsNotEmpty()
    // @IsNumber()
    // readonly average: number;
}
