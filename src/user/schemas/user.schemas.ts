import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  userEmail: string;

  @Prop({ required: true })
  password: string;

/*   @Prop()
  bio: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  profilePicture: string;

  @Prop()
  newField: string; */

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop()
  refreshToken?: string;

  @Prop({ default: false })
  isSessionActive: boolean;

  @Prop()
  lastActivity: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);