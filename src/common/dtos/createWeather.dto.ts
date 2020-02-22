import { IsNotEmpty, IsString } from 'class-validator';

export class createWeatherDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
