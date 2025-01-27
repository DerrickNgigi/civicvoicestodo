import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
  private readonly emailtransporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {
this.emailtransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10), // Convert to integer
  secure: process.env.SMTP_SECURE === 'true', // Convert to boolean
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Your SparkPost API key  .env
  },
});
  }

  private generateOTP(): number {
    return randomInt(100000, 999999);
  }

  async sendOtpToEmail(email: string): Promise<string> {
    const otp = this.generateOTP();
    console.log(process.env.SMTP_HOST);
    try {
      await this.emailtransporter.sendMail({
        from: 'fe61c97bc6-0a5e64@inbox.mailtrap.io',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`,
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
      });

      const otpEntity = this.otpRepository.create({
        email,
        otp: otp.toString(),
        status: 'new' as any,
      });
      await this.otpRepository.save(otpEntity);

      return otp.toString();
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP via email');
    }
  }

  // Method to verify OTP
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    // Find OTP by email
    const otpblock = await this.otpRepository.findOne({ where: { email } });

    // Check if OTP exists
    if (!otpblock) {
      throw new Error('OTP does not exist');
    }

    // Check if OTP is correct
    if (otpblock.otp === otp) {
      // Update OTP status to used
      otpblock.status = 'used' as any;
      await this.otpRepository.save(otpblock);

      // delete OTP after verification
      await this.otpRepository.delete(otpblock.otpId);
      return true;
    } else {
      return false;
    }
  }

}
