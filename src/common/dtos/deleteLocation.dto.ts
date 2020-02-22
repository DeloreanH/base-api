import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteLocationDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
