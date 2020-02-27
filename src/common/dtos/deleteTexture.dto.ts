import { IsNotEmpty, IsMongoId } from 'class-validator';

export class deleteTextureDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
