import { Document } from 'mongoose';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export type UserDocument = User & Document;
export declare class User {
    userEmail: string;
    password: string;
    role: UserRole;
    refreshToken?: string;
    isSessionActive: boolean;
    lastActivity: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
