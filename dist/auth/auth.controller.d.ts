import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        message: string;
    }>;
    login(response: Response, loginDto: LoginDto): Promise<{
        user: any;
    }>;
    refreshTokens(refreshToken: string, req: any, response: Response): Promise<{
        message: string;
    }>;
    logout(req: any, refreshToken: string, response: Response): Promise<{
        message: string;
    }>;
    getCurrentUser(req: any): Promise<{
        user: any;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../user/schemas/user.schemas").User> & import("../user/schemas/user.schemas").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
        temporaryPassword?: undefined;
    } | {
        success: boolean;
        message: string;
        temporaryPassword: string;
    }>;
}
