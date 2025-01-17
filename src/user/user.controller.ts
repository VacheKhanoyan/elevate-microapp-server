import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(
        @Body() registerUserDto: RegisterUserDto
    ) {
        return this.userService.register(registerUserDto);
    }
}
