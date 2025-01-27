import {Body, Controller, Post, HttpCode, HttpStatus  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
    
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign in' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'janedoe@gmail.com',
                },
                password: {
                    type: 'string',
                    example: 'password',
                },
            },
        },
    })
    async signIn(@Body('email') email: string, @Body('password') password: string) {
        return this.authService.signIn(email, password);
    }
}
