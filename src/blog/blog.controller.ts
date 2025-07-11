import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
@UseGuards(AuthGuard('jwt'))
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('post')
  async createPost(
    @Request() req,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.blogService.createPost(
      req.user._id,
      req.user.userEmail,
      createPostDto,
    );
  }

  @Get('my-posts')
  async getMyPosts(@Request() req) {
    return await this.blogService.getUserPosts(req.user._id);
  }

  @Get()
  async getAllPosts() {
    return await this.blogService.getAllPosts();
  }
} 