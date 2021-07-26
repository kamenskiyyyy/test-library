import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BooksModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://nikolai:qwertyuiop@cluster0.ya4dq.mongodb.net/library?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
