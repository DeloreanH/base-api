import { IsNotEmpty, IsString, IsMongoId, IsDate } from 'class-validator';

export class updateStudyDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly texturesId: string;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly sectorId: string;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly sectorLocationId: string;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly userId: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsDate()
    readonly month: number;
    @IsNotEmpty()
    @IsString()
    readonly ph: number;
    @IsNotEmpty()
    @IsString()
    readonly mo: number;
    @IsNotEmpty()
    @IsString()
    readonly ce: number;
}
