import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getById(id: string): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async create(bookDto: BookDto): Promise<Book> {
    const newBook = new this.bookModel(bookDto);
    return newBook.save();
  }

  async update(id: string, bookDto: BookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, bookDto, { new: true });
  }

  async remove(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id);
  }
}
