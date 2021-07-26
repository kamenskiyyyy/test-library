import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { Book } from '../../books/schemas/book.schema';

export class UsersDto {
  @IsEmail()
  login: string;

  @IsString()
  @MinLength(6, { message: 'Минимальная длинна пароля 6 символов' })
  password: string;

  @IsOptional()
  @IsBoolean()
  libraryCard?: boolean;

  @IsOptional()
  @IsArray()
  purchasedBooks?: Types.Array<Book>;
}
