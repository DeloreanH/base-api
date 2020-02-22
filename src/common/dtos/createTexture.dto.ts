import { IsString, IsNotEmpty } from 'class-validator';

export class createTextureDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
