import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createdBookDto: BookDto): Promise<Book> {
    return this.bookService.create(createdBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() updateBookDto: BookDto,
    @Param('id') id: string,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Book> {
    return this.bookService.remove(id);
  }
}
