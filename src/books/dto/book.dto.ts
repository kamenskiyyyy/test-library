import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class BookDto {
  @IsString()
  @Length(1, 50, { message: 'Длинна заголовка может быть от 1 до 50 символов' })
  title: string;

  @IsOptional()
  description: string;

  @IsNumber()
  @MinLength(1, { message: 'Обязательно укажите стоимость книги' })
  price: number;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsNumber()
  year: number;
}
