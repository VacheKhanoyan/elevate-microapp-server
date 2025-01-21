import { Controller, Post, Body, Patch } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered' })
    @ApiResponse({ status: 400, description: 'Invalid input or email already exists' })
    @Post('register')
    async register(
        @Body() registerUserDto: RegisterUserDto
    ) {
        return this.userService.register(registerUserDto);
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in' })
    @ApiResponse({ status: 401, description: 'Invalid email or password' })
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        return this.userService.login(email, password);
    }

    @ApiOperation({ summary: 'Request a password reset link' })
    @ApiResponse({ status: 200, description: 'Reset link sent successfully' })
    @ApiResponse({ status: 404, description: 'Email not found' })
    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        return this.userService.forgotPassword(email);
    }

    @ApiOperation({ summary: 'Reset user password' })
    @ApiResponse({ status: 200, description: 'Password reset successfully' })
    @ApiResponse({ status: 400, description: 'Invalid token or password' })
    @Patch('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;
        return this.userService.resetPassword(token, newPassword);
    }
}
