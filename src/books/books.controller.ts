import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../users/guards/jwt.guard';
import { BookEntity } from './book.entity';
import { DeleteResult } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAll(): Promise<BookEntity[]> {
    return this.bookService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<BookEntity> {
    return this.bookService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createdBookDto: BookDto): Promise<BookEntity> {
    return this.bookService.create(createdBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Body() updateBookDto: BookDto,
    @Param('id') id: number,
  ): Promise<BookEntity> {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.bookService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/buycard')
  async buyLibraryCard(@Param('id') id: number): Promise<UserEntity> {
    return this.bookService.buyLibraryCard(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idUser/getBook/:idBook')
  async purchaseBook(
    @Param('idUser') id: number,
    @Param('idBook') book: number,
  ): Promise<UserEntity> {
    return this.bookService.purchaseBook(id, book);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idUser/passBook/:idBook')
  async passBook(
    @Param('idUser') id: number,
    @Param('idBook') book: number,
  ): Promise<UserEntity> {
    return this.bookService.passBook(id, book);
  }
}
