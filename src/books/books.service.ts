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

  async getById(id: number): Promise<BookEntity> {
    return this.bookRepository.findOne(id);
  }

  async create(bookDto: BookDto): Promise<BookEntity> {
    const book = new BookEntity();
    Object.assign(book, bookDto);
    return await this.bookRepository.save(book);
  }

  async update(id: number, bookDto: BookDto): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new HttpException('Книга не найдена', HttpStatus.NOT_FOUND);
    }
    Object.assign(book, bookDto);
    return await this.bookRepository.save(book);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.bookRepository.delete(id);
  }

  async buyLibraryCard(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (user.libraryCard) {
      throw new BadRequestException('Вы уже купили читательский билет!');
    }
    Object.assign(user, (user.libraryCard = true));
    return await this.userRepository.save(user);
  }

  async purchaseBook(idUser: number, idBook: number) {
    const user = await this.userRepository.findOne(idUser);
    const book = await this.bookRepository.findOne(idBook);
    if (!!!book) throw new BadRequestException('Книга не найдена');
    if (!user.libraryCard) {
      throw new BadRequestException('Необходимо купить читательский билет!');
    }
    if (user.purchasedBooks.includes(+idBook)) {
      throw new BadRequestException('Вы уже взяли эту книгу!');
    }
    if (user.purchasedBooks.length === 5) {
      throw new BadRequestException(
        'Вы не можете взять больше пяти книг одновременно!',
      );
    }
    if (book.isReader) {
      throw new BadRequestException('Эту книгу кто-то уже взял!');
    }

    user.purchasedBooks.push(book.id);
    Object.assign(book, (book.isReader = true));
    await this.bookRepository.save(book);
    return this.userRepository.save(user);
  }

  async passBook(idUser: number, idBook: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(idUser);
    const book = await this.bookRepository.findOne(idBook);
    if (!!!user) throw new BadRequestException('Пользователь не найден');
    if (!!!book) throw new BadRequestException('Книга не найдена');

    const purchasedBooks = user.purchasedBooks;
    if (purchasedBooks.length === 0) {
      throw new BadRequestException(
        'Вы не брали книги для чтения или вы сдали все книги в библиотеку.',
      );
    }
    const idx = purchasedBooks.indexOf(+idBook);
    if (idx >= 0) {
      purchasedBooks.splice(idx, 1);
    } else {
      throw new BadRequestException(
        'Вы не можете вернуть книгу, которую не брали.',
      );
    }

    Object.assign(book, (book.isReader = false));
    await this.bookRepository.save(book);
    return this.userRepository.save(user);
  }
}
