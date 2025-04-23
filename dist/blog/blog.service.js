"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("./schemas/blog.schema");
const mongoose_3 = require("mongoose");
let BlogService = class BlogService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async createPost(userId, userEmail, createPostDto) {
        const blog = await this.blogModel.findOne({ userId });
        const newPost = Object.assign(Object.assign({ _id: new mongoose_3.Types.ObjectId().toString() }, createPostDto), { createdAt: new Date() });
        if (!blog) {
            return await this.blogModel.create({
                userId,
                userEmail,
                posts: [newPost],
            });
        }
        blog.posts.push(newPost);
        return await blog.save();
    }
    async getUserPosts(userId) {
        const blog = await this.blogModel.findOne({ userId });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        return blog;
    }
    async getAllPosts() {
        return await this.blogModel.find();
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogService);
//# sourceMappingURL=blog.service.js.map