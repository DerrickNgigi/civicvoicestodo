import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('otp')
@ApiTags('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  @ApiOperation({ summary: 'send otp to email' })
      @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'janedoe@gmail.com',
                }
            },
        },
    })
  sendOtpToEmailp(@Body('email') email: string) {
    return this.otpService.sendOtpToEmail(email);
  }

  @Post('verify')
  @ApiOperation({ summary: 'verify otp' })
      @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                example: 'janedoe@gmail.com',
              },
              otp: {
                type: 'string',
                example: '123456',
              },
          },
        },
      })
    
  verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return this.otpService.verifyOtp(email, otp);
  }
}
