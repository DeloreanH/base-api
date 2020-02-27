import { IsNotEmpty, IsMongoId } from 'class-validator';

export class restoreStudyDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
