import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Types } from 'mongoose';
export declare class BlogService {
    private blogModel;
    constructor(blogModel: Model<Blog>);
    createPost(userId: string, userEmail: string, createPostDto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, Blog> & Blog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserPosts(userId: string): Promise<import("mongoose").Document<unknown, {}, Blog> & Blog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllPosts(): Promise<(import("mongoose").Document<unknown, {}, Blog> & Blog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
