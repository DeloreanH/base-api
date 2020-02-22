import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreLocationDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
