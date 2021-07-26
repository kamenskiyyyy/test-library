import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { ALREADY_REGISTERED_ERROR } from '../constants/auth.constants';
import { UserService } from './users.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from './user.model';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async register(@Body() dto: UsersDto): Promise<User> {
    const oldUser = await this.usersService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.usersService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('signin')
  async login(@Body() { login, password }: UsersDto) {
    const { email } = await this.usersService.validateUser(login, password);
    return this.usersService.login(email);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UsersDto): Promise<User> {
    return this.usersService.updateUser(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.removeUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/buycard')
  buyLibraryCard(@Param('id') id: string): Promise<User> {
    return this.usersService.buyLibraryCard(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idUser/getBook/:idBook')
  purchaseBook(@Param('idUser') id: string, @Param('idBook') book: string): Promise<User> {
    return this.usersService.purchaseBook(id, book);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idUser/passBook/:idBook')
  passBook(@Param('idUser') id: string, @Param('idBook') book: string): Promise<User> {
    return this.usersService.passBook(id, book);
  }
}
