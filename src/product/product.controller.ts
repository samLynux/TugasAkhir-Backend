import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDTO } from './models/product-create.dto';
import { ProductUpdateDTO } from './models/product-update.dto';
import { Gender } from './models/product.entity';
import { ProductService } from './product.service';


@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){
    }

    // @Put('sizeall')
    // async insertSizesToAll(
    //     @Body("sizes") ids: number[] = [1,2,3]
    // ){
    //     const products = await this.productService.all(
    //         ["category","brand", "sizes", "primaryColor", "secondaryColor"]
    //     );
    //     for(let x=8;x< products.length;x++)
    //     {   
    //         const newProduct = await this.productService.findOne(x);
    //         await this.productService.create({
    //             ...newProduct,
    //             sizes: ids.map(id => ({id}))
    //         });
    //     }
        

    //     return this.productService.all(
    //         ["category","brand", "sizes", "primaryColor", "secondaryColor"]
    //     );
    // }

    @Get()
    async all(
        @Query('page')page: number = 1
    ){
        return  this.productService.paginate(
            page,
            ["category","brand", "sizes", "primaryColor", "secondaryColor"],
            null,
            {popularity:"DESC", createdAt:"DESC"}
        );
    }

    @Post("filtered")
    async filtered(
        @Body() {categories, brands, size, colors, gender}: {
            categories: string[],
            brands: string[],
            colors: string[],
            size: string,
            gender: Gender
        },
    ){
        
        const data = await this.productService.all(
            ["category","brand", "sizes","primaryColor", "secondaryColor"],
            null,{popularity:"DESC", createdAt:"DESC"}
        );

        const results = data.filter(
            (d) => 
                (categories ? categories.includes(d.category.value) : true) &&
                (brands ? brands.includes(d.brand.value) : true ) &&
                (colors ? colors.includes(d.primaryColor.value || d.secondaryColor.value) : true ) &&
                (size ? !!d.sizes.find(s => s.value === size) : true) &&
                (gender ? (d.gender === gender || d.gender === Gender.n): true)
            )
        
        return {
            data: results.slice(0,16)
        }
        
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(
        @Body("body") body: ProductCreateDTO,
        @Body("sizes") ids: number[]= [1,2,3]
    ){
        
        return this.productService.create({
            ...body,
            sizes: ids.map(id => ({id}))
        });
    }

    @Get(':id')
    async get(@Param('id') id: number){
        return this.productService.findOne({id},["category","brand", "sizes", "primaryColor", "secondaryColor"]);
    }

    @Put(':id')
    async update(
        @Param('id') id : number,
        @Body("body") body: ProductUpdateDTO,
        @Body("sizes") ids: number[] = [1,2,3]
    ){
        if(body !== undefined)
            await this.productService.update(id, body)

        const newProduct = await this.productService.findOne(id);

        return this.productService.create({
            ...newProduct,
            sizes: ids.map(id => ({id}))
        });
    }

    @Delete(':id')
    async delete(@Param('id') id : number){
        return this.productService.delete(id);
    }

    
}
