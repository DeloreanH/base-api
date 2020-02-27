import { IsNotEmpty, IsMongoId } from 'class-validator';

export class restoreSectorDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
