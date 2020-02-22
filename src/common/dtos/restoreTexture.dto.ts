import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreTextureDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
