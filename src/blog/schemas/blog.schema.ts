import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Post {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: [Post], default: [] })
  posts: Post[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// Configure the toJSON transform
BlogSchema.set('toJSON', {
  transform: function(doc, ret) {
    // Arrange fields in the desired order for the main document
    const ordered = {
      _id: ret._id,
      userId: ret.userId,
      userEmail: ret.userEmail,
      posts: ret.posts.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        image: post.image,
        createdAt: post.createdAt
      })),
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
      __v: ret.__v
    };
    return ordered;
  }
}); 