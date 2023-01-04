import { Expose } from 'class-transformer';

// expose allows only these 3 properties to pass, exclude the rest
export class UserDTO {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
