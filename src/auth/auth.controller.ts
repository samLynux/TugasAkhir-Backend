import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './models/register.dto';

import { JwtService } from '@nestjs/jwt';
import {Request,  Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
        ){

    }

    @Post('register')
    async register(@Body() body: RegisterDTO){
        
        const hashed = await bcrypt.hash(body.password,12);
        const user = await this.userService.register(
            body.email,
            hashed,
        );

        

        return "user registered"
    }

    @Post('login')
    async login(
        @Body('email') email :string,
        @Body('password') password :string,
        @Res( {passthrough: true} ) response: Response
    ){
       const user = await this.userService.findOne({email})

       if(!user )
       {
        throw new NotFoundException('user not found');
       }

       if(!await bcrypt.compare(password, user.password)){
        throw new BadRequestException('Invalid credentials');
       }

       const jwt = await this.jwtService.signAsync({id:user.id});

       response.cookie('jwt',jwt, {httpOnly:true});

       return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request){
        const id = await this.authService.userId(request);

        return this.userService.findOne({id});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response){
        response.clearCookie('jwt');

        return {
            message: "success"
        }
    }

    @Put('password')
    async updatePassword(
        @Body('password') password: string,
        @Body('email') email: string,)
    {
        
        
        const hashed = await bcrypt.hash(password,12)
        await this.userService.updatePassword(email, {
            password: hashed
        });

        return this.userService.findOne({email});
    }


    @Get('test')
    async test(){

        return "ok";
    }
}
