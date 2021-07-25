import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Book } from '../books/schemas/book.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: false })
  libraryCard: boolean;

  @Prop({ default: [] })
  purchasedBooks: Types.Array<Book>;
}

export const UserSchema = SchemaFactory.createForClass(User);
