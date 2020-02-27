import { IsNotEmpty, IsMongoId } from 'class-validator';

export class deleteSectorDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
