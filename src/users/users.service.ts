import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from '../constants/auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: UsersDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserDocument, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
