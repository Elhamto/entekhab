import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  photo: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  charge: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
