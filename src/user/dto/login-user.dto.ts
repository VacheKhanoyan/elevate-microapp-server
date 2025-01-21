import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ description: 'Email address of the user' })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ApiProperty({ description: 'Password for the user account' })
    @IsString()
    password: string;
}
