import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
// import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const jwtSecret = config.get<string>('JWT_SECRET');
        const jwtExpires = config.get<string>('JWT_EXPIRES');

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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
