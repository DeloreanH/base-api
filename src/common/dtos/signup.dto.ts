import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class signUpDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
