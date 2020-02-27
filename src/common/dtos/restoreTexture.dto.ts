import { IsNotEmpty, IsMongoId } from 'class-validator';

export class restoreTextureDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
