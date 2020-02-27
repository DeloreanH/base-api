import { IsNotEmpty, IsMongoId } from 'class-validator';

export class deleteStudyDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
