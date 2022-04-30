import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Brand } from 'src/common/models/brand.entity';
import { Category } from 'src/common/models/category.entity';
import { Color } from 'src/common/models/color.entity';
import { Size } from 'src/common/models/size.entity';
import { Product } from 'src/product/models/product.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { Gender, UserPreference } from './models/user-preferences.entity';

@Injectable()
export class UserPreferencesService extends AbstractService{
    constructor(
        private productService: ProductService,
        @InjectRepository(UserPreference) private readonly userPrefRepository: Repository<UserPreference>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
        @InjectRepository(Color) private readonly colorRepository: Repository<Color>,
        @InjectRepository(Size) private readonly sizeRepository: Repository<Size>
    ) {
        super(userPrefRepository);
    }

    

    async findColors(name: string[]){
        const data = await this.colorRepository.find()

        return data.filter(d => name.includes(d.value))
    }

    async findCategories(name: string[]){
        const data = await this.categoryRepository.find()

        return data.filter(d => name.includes(d.value))
    }

    async findBrands(name: string[]){
        const data = await this.brandRepository.find()

        return data.filter(d => name.includes(d.value))

        
    }

    async findSize(name: string){
        return this.sizeRepository.findOne({value: name})
        

    }


    async addFav(id: number,product_id: number){
        
        const prefs = await this.findOne({user: id}, ["favourites"]);
        const product = await this.productService.findOne({id:product_id});
        let favourites: any = prefs.favourites
        // console.log(product_id);
        
        favourites.push(product)
        let newPrefs = new UserPreference()
        newPrefs = {
            ...prefs,
            favourites: favourites
        }
        await this.userPrefRepository.save(newPrefs)
        return this.findOne({user: id}, ["user", "favourites"]);
        
    }

    async removeFav(id: number,product_id: number){
        
        const prefs = await this.findOne({user: id}, ["favourites"]);
        const product = await this.productService.findOne({id:product_id});
        let favourites: any = prefs.favourites
        
        
        
        
        let newPrefs = new UserPreference()
        newPrefs = {
            ...prefs,
            favourites: favourites.filter((fav)=> fav.id !== product.id)
        }
        // console.log(newPrefs);
        await this.userPrefRepository.save(newPrefs)
        return this.findOne({user: id}, ["user", "favourites"]);
        
    }

    async forUser(id: number){
        const pref = await this.findOne({user: id},[ "brands", "colors", "size"]);
        const data = await this.productService.all(
            ["category","brand", "sizes","primaryColor", "secondaryColor"],
            null,{popularity:"DESC", createdAt:"DESC"}
        );

        if(pref.brands.length <= 0 &&
            pref.colors.length <= 0  &&
            !pref.size &&
            pref.gender === Gender.n
        ){
            return null
        }
        const results = data.filter(
                (d) => 
                    (pref.brands.length > 0 ? !!pref.brands.find(s => s.id === d.brand.id) : true) &&
                    (pref.colors.length > 0 ? !!pref.colors.find(s => s.id === d.primaryColor.id || s.id === d.secondaryColor.id) : true) &&
                    (pref.size ? !!d.sizes.find(s => s.value === pref.size.value) : true) &&
                    (pref.gender !== Gender.n ? d.gender === pref.gender: true)
                )
        
        
        return results.slice(0,16);
    }
}
