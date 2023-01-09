import { IsString } from 'class-validator';

export class ConfirmSignupRequestDto {
  @IsString()
  confirmationCode: string;

  @IsString()
  username: string;
}
