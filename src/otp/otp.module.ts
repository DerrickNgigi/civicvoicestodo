import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';


@Module({
  controllers: [OtpController],
  providers: [OtpService],
  imports: [TypeOrmModule.forFeature([Otp])],
  
})
export class OtpModule {}
