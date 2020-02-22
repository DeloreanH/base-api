import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteSectorDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
