import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDTO } from 'src/auth/models/user-update.dto';
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



    @Get('me')
    async getPrefs(@Req() request: Request,){
        const id = await this.authService.userId(request);
        return this.userPrefService.findOne(
            {user: id}, 
            ["user",  "brands", "colors", "size"]
        );
    }

    @Get('fav')
    async getFavs(@Req() request: Request,){
        const id = await this.authService.userId(request);
        const favourites = await this.userPrefService.findOne(
            {user: id}, 
            ["favourites",
                "favourites.category",
                "favourites.brand", 
                "favourites.sizes", 
                "favourites.primaryColor", 
                "favourites.secondaryColor"]
        );

        return favourites.favourites
    }

    @Get('favCheck')
    async checkFavs(@Req() request: Request,@Query('id') product_id: number,){
        const id = await this.authService.userId(request);
        
        return this.userPrefService.checkFav(id, product_id);
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



    @Post('favourited')
    async addFav(
        @Query('id') product_id: number,
        @Req() request: Request
    ){
        const id = await this.authService.userId(request);
        const favCheck = await this.userPrefService.checkFav(id, product_id);

        if(!favCheck){
            return this.userPrefService.addFav(id, product_id)
        }
        return this.userPrefService.removeFav(id, product_id)
    }


    // @Delete(':id')
    // async delete(@Param('id') id : number){
    //     return this.userService.delete(id);
    // }

    @Get('foruser')
    async forUser(@Req() request: Request,){
        const id = await this.authService.userId(request);
        return this.userPrefService.forUser(id)
    }
}
