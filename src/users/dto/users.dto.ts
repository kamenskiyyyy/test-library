import { IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Book } from '../../books/schemas/book.schema';

export class UsersDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  libraryCard: boolean;

  purchasedBooks: Types.Array<Book>;
}
