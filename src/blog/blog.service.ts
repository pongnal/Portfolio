import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Types } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {}

  async createPost(userId: string, userEmail: string, createPostDto: CreatePostDto) {
    const blog = await this.blogModel.findOne({ userId });

    const newPost = {
      _id: new Types.ObjectId().toString(),
      ...createPostDto,
      createdAt: new Date()
    };

    if (!blog) {
      // Create new blog document for user if it doesn't exist
      return await this.blogModel.create({
        userId,
        userEmail,
        posts: [newPost],
      });
    }

    // Add new post to existing blog document
    blog.posts.push(newPost as any);
    return await blog.save();
  }

  async getUserPosts(userId: string) {
    const blog = await this.blogModel.findOne({ userId });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async getAllPosts() {
    return await this.blogModel.find();
  }
} 