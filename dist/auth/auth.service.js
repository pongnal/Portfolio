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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(signUpDto) {
        const { userEmail, password } = signUpDto;
        const existingUser = await this.userService.findByEmail(userEmail);
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.create(Object.assign(Object.assign({}, signUpDto), { password: hashedPassword, role: 'USER' }));
        return {
            message: 'User registered successfully',
        };
    }
    async login(loginDto) {
        const { userEmail, password } = loginDto;
        const user = await this.userService.findByEmail(userEmail);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user._id.toString());
        await this.userService.update(user._id.toString(), {
            lastActivity: new Date(),
            isSessionActive: true,
        });
        const userResponse = Object.assign({}, user.toObject());
        delete userResponse.password;
        return {
            user: userResponse,
            tokens,
        };
    }
    async generateTokens(userId) {
        const payload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRES', '24h'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES', '7d'),
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.isSessionActive) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
        try {
            await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
        }
        catch (_a) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokens = await this.generateTokens(userId);
        await this.userService.update(userId, {
            lastActivity: new Date(),
        });
        return tokens;
    }
    async logout(userId) {
        await this.userService.update(userId, {
            isSessionActive: false,
            lastActivity: new Date(),
        });
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map