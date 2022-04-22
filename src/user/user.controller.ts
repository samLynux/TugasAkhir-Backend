import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDTO } from 'src/auth/models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDTO } from 'src/auth/models/user-update.dto';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreference } from './models/user-preferences.entity';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private userPrefService: UserPreferencesService,
        private authService: AuthService
        ){

    }

    @Get() 
    async all(@Query('page') page: number = 1){
        return await this.userService.paginate(page);
    }

    @Post()
    async create(@Body() body: UserCreateDTO): Promise<User>{
        const password = await bcrypt.hash('1234',12)

        const { ...data} = body;

        return this.userService.create({
            ...data,
            password,
        });
    }

    @Get(':id')
    async get(@Param('id') id: number){
        return this.userPrefService.findOne({user: id}, ["user", "favourites"]);
    }

    @Put('info')
    async updateInfo(@Req() request: Request, @Body() body: UserUpdateDTO){
        const id = await this.authService.userId(request);
        await this.userService.update(id, body)

        return this.userService.findOne(id);
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request, 
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,)
    {
        if(password !== password_confirm)
        {
            throw new BadRequestException('Passwords does not match');
        }
        const id = await this.authService.userId(request);

        const hashed = await bcrypt.hash(password,12)
        await this.userService.update(id, {
            password: hashed
        });

        return this.userService.findOne(id);
    }


    @Put(':id')
    async update(
        @Param('id') id : number,
        @Body() body: UserUpdateDTO

    ){

        const { ...data} = body;
        await this.userService.update(id, {
            ...data,
        })

        return this.userService.findOne(id);
    }

    @Put('pref/edit')
    async updatePref(
        @Body() body: UserPreference,
        @Req() request: Request
    ){
        const id = await this.authService.userId(request);
        const prefId: any = this.userPrefService.findIdByUserId(id)
        const { ...data} = body;
        
        await this.userPrefService.update(prefId, {
            ...data,
        })

        return this.userPrefService.findOne({user: id}, ["user", "favourites"]);
    }

    @Put('favourite/add')
    async addFav(
        @Body("favourites") ids: number[],
        @Req() request: Request
    ){
        const id = await this.authService.userId(request);
        return this.userPrefService.addFav(id, ids)
    }

    @Delete(':id')
    async delete(@Param('id') id : number){
        return this.userService.delete(id);
    }
}
