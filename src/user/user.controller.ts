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
import { Gender, UserPreference } from './models/user-preferences.entity';


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

    // @Get() 
    // async all(@Query('page') page: number = 1){
    //     return await this.userService.paginate(page);
    // }

    @Get()
    async userGet(
        @Req() request: Request
    ){
        const id = await this.authService.userId(request);

        return this.userService.findOne(id);
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

    @Get('me')
    async getPrefs(@Req() request: Request,){
        const id = await this.authService.userId(request);
        return this.userPrefService.findOne(
            {user: id}, 
            ["user",  "brands", "colors", "size"]
        );
    }

    @Post('updatepref')
    async updateInfo(
        @Req() request: Request, 
        @Body() { brands, size, colors, gender}: {
            brands: string[],
            colors: string[],
            size: string,
            gender: Gender
        },
    ){
        const id = await this.authService.userId(request);
        const userPref = await this.userPrefService.findOne(
            {user: id}, 
            ["user",  "brands", "colors", "size"]
        );
        if(!userPref){
            await this.userPrefService.create({
                colors: colors ? (await this.userPrefService.findColors(colors)) : [],
                size: size ? await this.userPrefService.findSize(size) : [],
                brands: brands ? await this.userPrefService.findBrands(brands) : [],
                gender: gender ? gender: Gender.n,
                user: id
            });
            return this.userPrefService.findOne(
                {user: id}, 
                ["user",  "brands", "colors", "size"]
            );
        }  
         
        const newPrefs: UserPreference = {
            ...userPref,
            colors: colors ? (await this.userPrefService.findColors(colors)) : [],
            size: size ? await this.userPrefService.findSize(size) : null,
            brands: brands ? await this.userPrefService.findBrands(brands) : [],
            gender: gender ? gender : Gender.n,
            user: id
        }
        await this.userPrefService.create(newPrefs)
        
        return this.userPrefService.findOne(
            {user: id}, 
            ["user", "brands", "colors", "size"]
        );
    }

    


    @Put()
    async update(
        @Body() body: UserUpdateDTO,
        @Req() request: Request
    ){
        const id = await this.authService.userId(request);
        const { ...data} = body;
        await this.userService.update(id, {
            ...data,
        })

        return this.userService.findOne(id);
    }



    @Post('favourite/add')
    async addFav(
        @Query('id') product_id: number,
        @Req() request: Request
    ){
        const id = await this.authService.userId(request);
        return this.userPrefService.addFav(id, product_id)
    }

    @Post('favourite/remove')
    async removeFav(
        @Query('id') product_id: number,
        @Req() request: Request
    ){
        const id = await this.authService.userId(request);
        return this.userPrefService.removeFav(id, product_id)
    }

    @Delete(':id')
    async delete(@Param('id') id : number){
        return this.userService.delete(id);
    }

    @Get('foruser')
    async forUser(@Req() request: Request,){
        const id = await this.authService.userId(request);
        return this.userPrefService.forUser(id)
    }
}
