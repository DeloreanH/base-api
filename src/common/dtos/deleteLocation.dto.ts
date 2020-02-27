import { IsNotEmpty, IsMongoId } from 'class-validator';

export class deleteLocationDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
