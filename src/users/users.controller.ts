import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
import { ALREADY_REGISTERED_ERROR } from '../constants/auth.constants';
import { UserService } from './users.service';

@Controller('/')
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
  @HttpCode(200)
  @Post('signin')
  async login(@Body() { login, password }: UsersDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
