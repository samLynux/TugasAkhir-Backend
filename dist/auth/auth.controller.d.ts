import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterDTO): Promise<string>;
    login(email: string, password: string, response: Response): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    updatePassword(password: string, email: string): Promise<any>;
}
