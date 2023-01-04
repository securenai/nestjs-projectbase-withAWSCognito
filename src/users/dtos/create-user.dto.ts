// lists of the different properities that all a create user api should have
import { IsEmail, IsString } from 'class-validator'; // provides decorators to validate properties

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
