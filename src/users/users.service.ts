import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/createUsers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UpdateUsersDto } from './dto/updateUsers.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: CreateUsersDto) {
    const userByEmail = await this.userRepository.findOne({
      email: dto.email,
    });
    if (userByEmail) {
      throw new HttpException(
        'Пользователь с таким email уже есть',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, dto);
    return await this.userRepository.save(newUser);
  }

  async findUser(email: string) {
    return this.userRepository.findOne(email);
  }

  async login(dto: CreateUsersDto) {
    const user = await this.userRepository.findOne(
      { email: dto.email },
      { select: ['id', 'email', 'password'] },
    );
    if (!user) {
      throw new HttpException(
        'Пользователь не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(dto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Неверный пароль',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    delete user.password;
    return { ...user, token: this.generateJwt(user) };
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id) {
    return this.userRepository.findOne(id);
  }

  async updateUser(id, dto: UpdateUsersDto) {
    const userByEmail = await this.userRepository.findOne({
      email: dto.email,
    });
    if (userByEmail) {
      throw new HttpException(
        'Пользователь с таким email уже есть',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const user = await this.userRepository.findOne(id);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async removeUser(id) {
    return this.userRepository.delete(id);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      this.configService.get('JWT_SECRET'),
    );
  }
}
