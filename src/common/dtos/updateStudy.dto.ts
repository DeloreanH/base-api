import { IsNotEmpty, IsString, IsMongoId, IsDate, IsNumber } from 'class-validator';

export class updateStudyDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsMongoId()
    readonly texturesId: string;
    @IsNotEmpty()
    @IsMongoId()
    readonly sectorId: string;
    @IsNotEmpty()
    @IsMongoId()
    readonly locationId: string;
    @IsNotEmpty()
    @IsMongoId()
    readonly userId: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsNumber()
    readonly month: number;
    @IsNotEmpty()
    @IsNumber()
    readonly ph: number;
    @IsNotEmpty()
    @IsNumber()
    readonly mo: number;
    @IsNotEmpty()
    @IsNumber()
    readonly ce: number;
}
