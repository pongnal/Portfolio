import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signUp(signUpDto: SignUpDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto, response: Response): Promise<{
        user: any;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshTokens(req: any, response: Response): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    logout(req: any, response: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): {
        user: any;
    };
    getAllUsers(): Promise<import("../user/schemas/user.schemas").User[]>;
}
