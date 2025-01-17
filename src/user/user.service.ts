import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(@Body() registerUserDto: RegisterUserDto) {
        const { firstname, lastname, email, password } = registerUserDto;
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: { firstname, lastname, email, password: hashedPassword },
        });

        return this.generateJwt(user.id, user.email);
    }

    private generateJwt(userId: string, email: string): { accessToken: string } {
        const payload = { sub: userId, email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}

