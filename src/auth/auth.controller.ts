import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Req,
    Res,
    Request,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { SignUpDto } from './dto/signup.dto';
  import { LoginDto } from './dto/login.dto';
  import { AuthGuard } from '@nestjs/passport';
  import { Roles } from './decorators/roles.decorator';
  import { RolesGuard } from './guards/roles.guard';
  import { UserRole } from '../user/schemas/user.schemas';
  import { Response } from 'express';
  import { ForgotPasswordDto } from './dto/forgot-password.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
      return this.authService.signUp(signUpDto);
    }
  
    @Post('/login')
    async login(
      @Res({ passthrough: true }) response: Response,
      @Body() loginDto: LoginDto,
    ): Promise<{ user: any }> {
      const result = await this.authService.login(loginDto);
  
      // Always set cookies (for testing/development convenience)
      response.cookie('access_token', result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production, false in dev
        sameSite: 'lax',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });
  
      response.cookie('refresh_token', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });
  
      // Only return user info, not tokens
      return {
        user: result.user
      };
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Post('/refresh')
    async refreshTokens(
      @Body('refreshToken') refreshToken: string,
      @Request() req,
      @Res({ passthrough: true }) response: Response,
    ) {
      const tokens = await this.authService.refreshTokens(
        req.user._id,
        refreshToken,
      );
  
      // Always set cookies
      response.cookie('access_token', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
  
      response.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
  
      // Return success message only
      return { message: 'Tokens refreshed successfully' };
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Post('/logout')
    async logout(
      @Request() req, 
      @Body('refreshToken') refreshToken: string,
      @Res({ passthrough: true }) response: Response,
    ) {
      await this.authService.logout(req.user._id, refreshToken);
      
      // Always clear cookies
      response.clearCookie('access_token');
      response.clearCookie('refresh_token');
  
      return { message: 'Logged out successfully' };
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async getCurrentUser(@Request() req) {
      return { user: req.user };
    }
  
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('/users')
    getAllUsers() {
      return this.authService.getAllUsers();
    }
  
    @Post('/forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
      return this.authService.forgotPassword(forgotPasswordDto.userEmail);
    }
  }
  