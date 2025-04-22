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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schemas_1 = require("../user/schemas/user.schemas");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const crypto = require("crypto");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(signUpDto) {
        const { userEmail, password } = signUpDto;
        const existingUser = await this.userModel.findOne({ userEmail });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userModel.create(Object.assign(Object.assign({}, signUpDto), { password: hashedPassword }));
        return {
            message: 'Registration successful. Please login to continue.',
        };
    }
    async login(loginDto) {
        const { userEmail, password } = loginDto;
        const user = await this.userModel.findOne({ userEmail });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const tokens = await this.generateTokens(user._id.toString());
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
    async generateTokens(userId) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ id: userId }, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRES,
            }),
            this.jwtService.signAsync({ id: userId }, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRES,
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.userModel.findById(userId);
        if (!user || !user.refreshToken)
            throw new common_1.UnauthorizedException('Access Denied');
        if (refreshToken !== user.refreshToken) {
            throw new common_1.UnauthorizedException('Access Denied');
        }
        user.lastActivity = new Date();
        const tokens = await this.generateTokens(user._id.toString());
        user.refreshToken = tokens.refreshToken;
        await user.save();
        return tokens;
    }
    async logout(userId, refreshToken) {
        const user = await this.userModel.findById(userId);
        if (!user || !user.refreshToken) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
        if (refreshToken && refreshToken !== user.refreshToken) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        await this.userModel.updateOne({ _id: userId }, {
            $unset: { refreshToken: 1 },
            $set: { isSessionActive: false },
            $currentDate: {
                lastActivity: true,
                updatedAt: true,
            },
        });
        return { message: 'Logged out successfully' };
    }
    async getAllUsers() {
        return await this.userModel
            .find({}, { password: 0, refreshToken: 0 })
            .exec();
    }
    async forgotPassword(userEmail) {
        let newPassword;
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
            await this.userModel.updateOne({ userEmail }, { $set: { password: hashedPassword } });
            return {
                success: true,
                message: 'Password has been reset successfully.',
                temporaryPassword: newPassword
            };
        }
        catch (error) {
            console.error('Forgot password error:', error);
            return {
                success: false,
                message: 'An error occurred while processing your request.',
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schemas_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map