import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class deleteWeatherDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
