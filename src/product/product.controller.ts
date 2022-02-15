import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
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
    async all(@Query('page')page: number = 1){
        return this.productService.paginate();
    }

    @Post()
    async create(@Body() body: ProductCreateDTO){
        return this.productService.create(body);
    }

    @Get(':id')
    async get(@Param('id') id: number){
        return this.productService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id : number,
        @Body() body: ProductUpdateDTO

    ){
        await this.productService.update(id, body)

        return this.productService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id : number){
        return this.productService.delete(id);
    }
}
