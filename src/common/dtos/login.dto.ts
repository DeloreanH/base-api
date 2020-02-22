import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class loginDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
