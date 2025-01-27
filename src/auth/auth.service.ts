import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }
    
    // sign in
    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && user.password === password) {
            // TODO: Generate a JWT and return it
            // retuen user object for now
            return user;
        }
        throw new UnauthorizedException('Invalid email or password');
    }
}
