import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BooksModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://nikolai:qwertyuiop@cluster0.ya4dq.mongodb.net/library?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}
