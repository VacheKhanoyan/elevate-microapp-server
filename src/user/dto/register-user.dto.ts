import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterUserDto {
    @ApiProperty({ description: 'First name of the user' })
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({ description: 'Last name of the user' })
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({ description: 'Email address of the user' })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ApiProperty({ description: 'Password for the user account', minLength: 8 })
    @MinLength(8)
    password: string;
}
