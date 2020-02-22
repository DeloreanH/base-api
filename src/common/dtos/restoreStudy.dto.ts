import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreStudyDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
