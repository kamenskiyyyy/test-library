import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Минимальная длинна пароля 6 символов' })
  password: string;

  @IsOptional()
  @IsBoolean()
  libraryCard?: boolean;

  @IsOptional()
  @IsArray()
  purchasedBooks?: number[];
}
