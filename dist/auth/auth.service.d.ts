import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schemas';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userModel;
    private jwtService;
    private configService;
    constructor(userModel: Model<User>, jwtService: JwtService, configService: ConfigService);
    signUp(signUpDto: SignUpDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: any;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    private generateTokens;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, refreshToken: string): Promise<{
        message: string;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    forgotPassword(userEmail: string): Promise<{
        success: boolean;
        message: string;
        temporaryPassword?: undefined;
    } | {
        success: boolean;
        message: string;
        temporaryPassword: string;
    }>;
}
