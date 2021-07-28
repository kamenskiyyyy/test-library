import {
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
import { UserService } from './users.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserEntity } from './user.entity';
import { DeleteResult } from 'typeorm';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async register(@Body() createUserDto: UsersDto): Promise<UserEntity> {
    return await this.usersService.createUser(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('signin')
  async login(@Body() loginDto: UsersDto) {
    return await this.usersService.login(loginDto);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UsersDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.removeUser(id);
  }
}
