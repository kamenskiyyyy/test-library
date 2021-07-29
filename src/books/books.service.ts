import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  async getById(id: string): Promise<BookEntity> {
    return this.bookRepository.findOne(id);
  }

  async create(bookDto: BookDto): Promise<BookEntity> {
    const book = new BookEntity();
    Object.assign(book, bookDto);
    return await this.bookRepository.save(book);
  }

  async update(id: string, bookDto: BookDto): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new HttpException('Книга не найдена', HttpStatus.NOT_FOUND);
    }
    Object.assign(book, bookDto);
    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.bookRepository.delete(id);
  }

  async buyLibraryCard(id): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (user.libraryCard) {
      throw new BadRequestException('Вы уже купили читательский билет!');
    }
    Object.assign(user, (user.libraryCard = true));
    return await this.userRepository.save(user);
  }

  async purchaseBook(idUser, idBook) {
    debugger;
    const user = await this.userRepository.findOne(idUser);
    const book = await this.bookRepository.findOne(idBook);
    if (!user.libraryCard) {
      throw new BadRequestException('Необходимо купить читательский билет!');
    }
    if (user.purchasedBooks.length === 5) {
      throw new BadRequestException(
        'Вы не можете взять больше пяти книг одновременно!',
      );
    }
    // Метод не работает из-за получения массива в виде строки
    // if (user.purchasedBooks.find((book) => book.id === idBook)) {
    //   throw new BadRequestException('Вы уже взяли эту книгу!');
    // }
    if (book.isReader) {
      throw new BadRequestException('Эту книгу кто-то уже взял!');
    }

    user.purchasedBooks.push(book);
    Object.assign(book, (book.isReader = true));
    await this.bookRepository.save(book);
    return this.userRepository.save(user);
  }

  async passBook(idUser, idBook): Promise<UserEntity> {
    const user = await this.userRepository.findOne(idUser);
    const purchasedBooks: BookEntity[] = user.purchasedBooks.filter(
      (book) => book.id !== idBook,
    );
    Object.assign(user, (user.purchasedBooks = purchasedBooks));
    return this.userRepository.save(user);
  }
}
