import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDTO } from './models/product-create.dto';
import { ProductUpdateDTO } from './models/product-update.dto';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){
    }

    @Get()
    async all(
        @Query('page')page: number = 1
    ){
        return  this.productService.paginate(page,["category","brand", "sizes"],null,{popularity:"DESC", createdAt:"DESC"});
    }

    @Post("filtered")
    async filtered(
        @Body() {categories, brands, size, colors}: {
            categories: string[],
            brands: string[],
            colors: string[],
            size: string
        },
    ){
        
        const data = await this.productService.all(["category","brand", "sizes"],null,{popularity:"DESC", createdAt:"DESC"});

        
        return {
            data: data.filter(
                (d) => 
                    (categories ? categories.includes(d.category.value) : true) &&
                    (brands ? brands.includes(d.brand.value) : true ) &&
                    (colors ? colors.includes(d.primaryColor || d.secondaryColor) : true ) &&
                    (size ? !!d.sizes.find(s => s.value === size) : true)
                ),
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
        return this.productService.findOne({id});
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
