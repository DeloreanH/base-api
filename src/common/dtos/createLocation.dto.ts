import { IsMongoId, IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class createLocationDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly sectorId: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsNumber()
    readonly ASNM: number;
    @IsNotEmpty()
    @IsArray()
    readonly texturesIds: string[];
}
