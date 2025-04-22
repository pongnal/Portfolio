"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_schemas_1 = require("../user/schemas/user.schemas");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const jwtSecret = config.get('JWT_SECRET');
                    const jwtExpires = config.get('JWT_EXPIRES');
                    if (!jwtSecret) {
                        throw new Error('JWT_SECRET is not defined');
                    }
                    if (!jwtExpires) {
                        throw new Error('JWT_EXPIRES is not defined');
                    }
                    return {
                        secret: jwtSecret,
                        signOptions: {
                            expiresIn: jwtExpires,
                        },
                    };
                },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: user_schemas_1.User.name, schema: user_schemas_1.UserSchema }]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule, auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map