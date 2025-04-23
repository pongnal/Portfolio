import { Document, Schema as MongooseSchema } from 'mongoose';
declare class Post {
    _id: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
}
export declare class Blog {
    userId: string;
    userEmail: string;
    posts: Post[];
}
export declare const BlogSchema: MongooseSchema<Blog, import("mongoose").Model<Blog, any, any, any, Document<unknown, any, Blog> & Blog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, import("mongoose").FlatRecord<Blog>> & import("mongoose").FlatRecord<Blog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
