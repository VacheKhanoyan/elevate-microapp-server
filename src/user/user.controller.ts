import { Controller, Post, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('register')
    async register(
        @Body() registerUserDto: RegisterUserDto
    ) {
        return this.userService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        return this.userService.login(email, password);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        return this.userService.forgotPassword(email);
    }

    @Patch('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;
        return this.userService.resetPassword(token, newPassword);
    }
}
