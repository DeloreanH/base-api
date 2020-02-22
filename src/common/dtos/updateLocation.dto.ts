import { IsNotEmpty, IsString, IsMongoId, IsNumber, IsArray } from 'class-validator';

export class updateLocationDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
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
