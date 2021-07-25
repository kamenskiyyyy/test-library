import { IsString } from 'class-validator';

export class UsersDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
