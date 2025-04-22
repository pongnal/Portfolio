import {
    Injectable,
    ConflictException,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { User } from '../user/schemas/user.schemas';
  import * as bcrypt from 'bcryptjs';
  import { JwtService } from '@nestjs/jwt';
  import { SignUpDto } from './dto/signup.dto';
  import { LoginDto } from './dto/login.dto';
/*   import { UserRole } from '../user/schemas/user.schemas';
 */  import * as crypto from 'crypto';
  import { ConfigService } from '@nestjs/config';
  import * as SibApiV3Sdk from 'sib-api-v3-sdk';
  import * as path from 'path';
  import * as fs from 'fs';
  import * as Handlebars from 'handlebars';
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
      const { userEmail, password } = signUpDto;
  
      const existingUser = await this.userModel.findOne({ userEmail });
      if (existingUser) {
        throw new ConflictException('Email already registered');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await this.userModel.create({
        ...signUpDto,
        password: hashedPassword,
      });
  
      return {
        message: 'Registration successful. Please login to continue.',
      };
    }
  
    async login(loginDto: LoginDto): Promise<{
      user: any;
      tokens: { accessToken: string; refreshToken: string };
    }> {
      const { userEmail, password } = loginDto;
      const user = await this.userModel.findOne({ userEmail });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }
  
      const tokens = await this.generateTokens(user._id.toString());
  
      // Update user with refresh token
      user.refreshToken = tokens.refreshToken;
      user.isSessionActive = true;
      user.lastActivity = new Date();
      await user.save();
  
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshToken;
  
      return {
        user: userResponse,
        tokens,
      };
    }
  
    private async generateTokens(userId: string) {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          { id: userId },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES,
          },
        ),
        this.jwtService.signAsync(
          { id: userId },
          {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES,
          },
        ),
      ]);
  
      return { accessToken, refreshToken };
    }
  
    async refreshTokens(userId: string, refreshToken: string) {
      const user = await this.userModel.findById(userId);
      if (!user || !user.refreshToken)
        throw new UnauthorizedException('Access Denied');
  
      if (refreshToken !== user.refreshToken) {
        throw new UnauthorizedException('Access Denied');
      }
  
      // Update last activity
      user.lastActivity = new Date();
      const tokens = await this.generateTokens(user._id.toString());
      user.refreshToken = tokens.refreshToken;
      await user.save();
  
      return tokens;
    }
  
    async logout(
      userId: string,
      refreshToken: string,
    ): Promise<{ message: string }> {
      // Find user and verify refresh token
      const user = await this.userModel.findById(userId);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid session');
      }
  
      // Verify if the provided refresh token matches the stored one
      if (refreshToken && refreshToken !== user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }
  
      // Remove refresh token and update session status
      await this.userModel.updateOne(
        { _id: userId },
        {
          $unset: { refreshToken: 1 },
          $set: { isSessionActive: false },
          $currentDate: {
            lastActivity: true,
            updatedAt: true,
          },
        },
      );
  
      return { message: 'Logged out successfully' };
    }
  
    async getAllUsers() {
      return await this.userModel
        .find({}, { password: 0, refreshToken: 0 })
        .exec();
    }
  
    async forgotPassword(userEmail: string) {
      let newPassword: string;
      try {
        const user = await this.userModel.findOne({ userEmail });
        if (!user) {
          return {
            success: false,
            message: 'Email doesn\'t exist.',
          };
        }
  
        newPassword = crypto.randomBytes(4).toString('hex').toUpperCase();
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        await this.userModel.updateOne(
          { userEmail },
          { $set: { password: hashedPassword } }
        );
  
        return {
          success: true,
          message: 'Password has been reset successfully.',
          temporaryPassword: newPassword
        };
      } catch (error) {
        console.error('Forgot password error:', error);
        return {
          success: false,
          message: 'An error occurred while processing your request.',
        };
      }
    }
  }
  