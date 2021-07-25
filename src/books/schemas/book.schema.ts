import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 'Неизвестно' })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'Неизвестно' })
  author: string;

  @Prop({ default: null })
  year: number;

  @Prop({ default: false })
  reader: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
