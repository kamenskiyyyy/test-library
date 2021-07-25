import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(dto: UsersDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async getAllUsers() {
    return this.userModel.find();
  }

  async getUserById(id) {
    return this.userModel.findById(id);
  }

  async updateUser(id, dto: UsersDto) {
    return this.userModel.findByIdAndUpdate(id, dto);
  }

  async removeUser(id) {
    return this.userModel.findByIdAndRemove(id);
  }

  async buyLibraryCard(id) {
    const user: UsersDto | any = await this.userModel.findById(id).exec();
    if (user.libraryCard) {
      throw new BadRequestException('Вы уже купили читательский билет!');
    }
    return this.userModel.findByIdAndUpdate(id, { libraryCard: true });
  }

  async purchaseBook(idUser, idBook) {
    const user: UsersDto | any = await this.userModel.findById(idUser).exec();
    if (!user.libraryCard) {
      throw new BadRequestException('Необходимо купить читательский билет!');
    }
    if (user.purchasedBooks.length === 5) {
      throw new BadRequestException(
        'Вы не можете взять больше пяти книг одновременно!',
      );
    }
    if (user.purchasedBooks.find((book) => book === idBook)) {
      throw new BadRequestException('Вы уже взяли эту книгу!');
    }
    const purchasedBooks: Array<any> = user.purchasedBooks;
    const newBook = [...purchasedBooks, idBook];
    return this.userModel.findByIdAndUpdate(idUser, {
      purchasedBooks: newBook,
    });
  }

  async passBook(idUser, idBook) {
    const user: UsersDto | any = await this.userModel.findById(idUser).exec();
    const purchasedBooks: Array<any> = user.purchasedBooks.filter(
      (book) => book !== idBook,
    );
    return this.userModel.findByIdAndUpdate(idUser, {
      purchasedBooks: purchasedBooks,
    });
  }
}
