import { sectorHumidityDTO } from './sectorHumidity.dto';
import { sectorLightDTO } from './sectorLight.dto';
import { sectorTemperatureDTO } from './sectorTemperature.dto';
import { IsString, IsNotEmpty, IsNumber, IsMongoId, IsArray } from 'class-validator';

export class createSectorDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsNumber()
    readonly pendingSince: number;
    @IsNotEmpty()
    @IsNumber()
    readonly pendingUntil: number;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly weatherId: string;
    @IsNotEmpty()
    @IsArray()
    readonly sectorHumidities: sectorHumidityDTO[];
    @IsNotEmpty()
    @IsArray()
    readonly sectorLights: sectorLightDTO[];
    @IsNotEmpty()
    @IsArray()
    readonly sectorTemperatures: sectorTemperatureDTO[];
}
