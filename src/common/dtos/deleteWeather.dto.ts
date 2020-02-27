import { IsNotEmpty, IsMongoId } from 'class-validator';

export class deleteWeatherDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
