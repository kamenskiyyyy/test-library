import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.bookService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getById(id);
  }

  @Post()
  create(@Body() createdBookDto: BookDto): Promise<Book> {
    return this.bookService.create(createdBookDto);
  }

  @Put(':id')
  update(
    @Body() updateBookDto: BookDto,
    @Param('id') id: string,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Book> {
    return this.bookService.remove(id);
  }
}
