import { IsString } from 'class-validator';

export class ResendCodeRequestDto {
  @IsString()
  username: string;
}
