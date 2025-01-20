import { Injectable, BadRequestException, Body, NotFoundException, UnauthorizedException } from '@nestjs/common';
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


    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new NotFoundException('Invalid email or password.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        return this.generateJwt(user.id, user.email);
    }

    async forgotPassword(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new NotFoundException('Email not found.');
        }

        const resetToken = this.jwtService.sign({ email }, { expiresIn: '15m' });
        // Here, send the resetToken via email. You can use a service like Nodemailer.
        return { message: 'Password reset link has been sent.', resetToken };
    }

    async resetPassword(token: string, newPassword: string) {
        const decoded = this.jwtService.verify(token);
        const { email } = decoded;

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new NotFoundException('Invalid token.');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return { message: 'Password has been successfully reset.' };
    }

    private generateJwt(userId: string, email: string): { accessToken: string } {
        const payload = { sub: userId, email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}

