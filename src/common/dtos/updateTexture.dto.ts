import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class updateTextureDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
