import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'autorack.proxy.rlwy.net',
      port: 27263,
      username: 'postgres',
      password: 'A4cf3eAcDCecagbgBFdGadec4CD25gAa',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
      envFilePath: '.env', // Specifies the path to the .env file
    }),
    TodoModule,
    UserModule,
    AuthModule,
    OtpModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
