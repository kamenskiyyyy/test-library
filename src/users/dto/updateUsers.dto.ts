import { IsEmail } from 'class-validator';

export class UpdateUsersDto {
  @IsEmail()
  email: string;
}
