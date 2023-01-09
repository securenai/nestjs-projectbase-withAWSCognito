import { IsString } from 'class-validator';

export class AwsCSCallbackDto {
  @IsString()
  id: string;
}
