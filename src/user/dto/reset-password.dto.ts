import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ description: 'JWT token for password reset' })
    @IsString()
    token: string;

    @ApiProperty({ description: 'New password for the user account' })
    @IsString()
    newPassword: string;
}
