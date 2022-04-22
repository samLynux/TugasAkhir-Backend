import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Product } from 'src/product/models/product.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { UserPreference } from './models/user-preferences.entity';

@Injectable()
export class UserPreferencesService extends AbstractService{
    constructor(
        private productService: ProductService,
        @InjectRepository(UserPreference) private readonly userPrefRepository: Repository<UserPreference>
    ) {
        super(userPrefRepository);
    }

    async findIdByUserId(id: number){
        const data: any =  this.findOne({user: id});

        return data.id
    }


    async addFav(id: number,ids: number[]){
        
        const prefs = await this.findOne({user: id}, ["favourites"]);
        const product = await this.productService.findOne({id:1});
        let favourites: any = prefs.favourites
        console.log(favourites);
        
        favourites.push(product)
        let newPrefs = new UserPreference()
        newPrefs = {
            ...prefs,
            favourites: favourites
        }
        await this.userPrefRepository.save(newPrefs)
        return this.findOne({user: id}, ["user", "favourites"]);
        
    }


}
