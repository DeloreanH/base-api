import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';

export class DeleteDocumentDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
