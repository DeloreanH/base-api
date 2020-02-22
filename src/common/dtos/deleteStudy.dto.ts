import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteStudyDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
