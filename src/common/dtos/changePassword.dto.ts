import { IsString, IsNotEmpty } from 'class-validator';

export class changePasswordDTO {
   @IsNotEmpty()
   @IsString()
   readonly newPassword: string;
}
