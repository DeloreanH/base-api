import { IsString, IsNotEmpty } from 'class-validator';

export class changeProfileDTO {
   @IsNotEmpty()
   @IsString()
   readonly name: string;
}
