import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  libraryCard: boolean;

  @Prop()
  purchasedBooks: Types.Array<any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
