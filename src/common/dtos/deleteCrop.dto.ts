import { IsNotEmpty, IsMongoId } from 'class-validator';

export class deleteCropDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
