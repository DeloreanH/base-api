import { IsNotEmpty, IsMongoId } from 'class-validator';

export class restoreLocationDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
