import { IsNotEmpty, IsMongoId } from 'class-validator';

export class restoreWeatherDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
