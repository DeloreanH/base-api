import { IsNotEmpty, IsMongoId } from 'class-validator';

export class restoreCropDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
