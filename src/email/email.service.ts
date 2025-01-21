import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(private readonly mailerService: MailerService) { }

    async sendPasswordReset(email: string, resetToken: string): Promise<void> {
        const resetUrl = `${process.env.APP_BASE_URL}/reset-password?token=${resetToken}`;
        try {
            this.logger.log(`Sending password reset email to ${email}`);
            await this.mailerService.sendMail({
                to: email,
                subject: 'Password Reset Request',
                template: './reset-password',
                context: {
                    resetUrl,
                },
            });
            this.logger.log(`Password reset email sent to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send password reset email to ${email}`, error.stack);
            throw new InternalServerErrorException('Failed to send password reset email.');
        }
    }
}
