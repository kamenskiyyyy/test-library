import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
import { ALREADY_REGISTERED_ERROR } from '../constants/auth.constants';
import { UserService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async register(@Body() dto: UsersDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.usersService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('signin')
  async login(@Body() { login, password }: UsersDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UsersDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  @Put(':id/buycard')
  buyLibraryCard(@Param('id') id: string) {
    return this.usersService.buyLibraryCard(id);
  }

  @Put(':idUser/getBook/:idBook')
  purchaseBook(@Param('idUser') id: string, @Param('idBook') book: string) {
    return this.usersService.purchaseBook(id, book);
  }

  @Put(':idUser/passBook/:idBook')
  passBook(@Param('idUser') id: string, @Param('idBook') book: string) {
    return this.usersService.passBook(id, book);
  }
}
