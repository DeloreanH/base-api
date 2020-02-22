import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreWeatherDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
