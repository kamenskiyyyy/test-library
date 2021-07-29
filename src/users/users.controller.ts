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
import { CreateUsersDto } from './dto/createUsers.dto';
import { UserService } from './users.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserEntity } from './user.entity';
import { DeleteResult } from 'typeorm';
import { UpdateUsersDto } from './dto/updateUsers.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async register(@Body() createUserDto: CreateUsersDto): Promise<UserEntity> {
    return await this.usersService.createUser(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('signin')
  async login(@Body() loginDto: CreateUsersDto) {
    return await this.usersService.login(loginDto);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUsersDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.removeUser(id);
  }
}
