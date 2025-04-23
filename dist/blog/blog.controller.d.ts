import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    createPost(req: any, createPostDto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog> & import("./schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMyPosts(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog> & import("./schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllPosts(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog> & import("./schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
