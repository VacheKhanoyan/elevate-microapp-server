import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
    @ApiProperty({ description: 'Email address to send the reset link' })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;
}
