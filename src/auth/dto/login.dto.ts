import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
