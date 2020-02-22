import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class restoreSectorDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
