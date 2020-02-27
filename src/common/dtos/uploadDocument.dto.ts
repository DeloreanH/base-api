import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class UploadDocumentDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly cropId: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
