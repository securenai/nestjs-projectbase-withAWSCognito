import { IsString } from 'class-validator';

export class RedirectRequestDto {
  // @IsString()
  idToken: string;
  // @IsString()
  accessToken: string;
  // @IsString()
  expiresIn: string;
}
