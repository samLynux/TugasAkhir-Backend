import { ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, Body, Req, Param } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { Request } from 'express';
import { OrderItemsService } from './order-items.service';
import { AuthService } from 'src/auth/auth.service';
import { OrderCreateDTO } from './models/order.create.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
    constructor(
        private orderService:OrderService,
        private orderItemsService: OrderItemsService,
        private authService: AuthService,
        ){
            
    }

    @Get('chart')
    async chart(@Req() request: Request){
        const id = await this.authService.userId(request);
        return this.orderService.chart(id);
    }

    @Get()
    async all( @Req() request: Request){
        const id = await this.authService.userId(request);
        return this.orderService.all( null, {
            user: { id: id},}, {id: "DESC"}
        );

        
    }

    

    @Get(':id')
    async transactionDetails(
        @Param('id') id: number
    ){
        return this.orderService.findOne({
            id, 
        }, ['order_items',"order_items.product"]);
    }

    

    @Post()
    async create(@Body() body: OrderCreateDTO, @Req() request: Request){
        const id = await this.authService.userId(request);
 
        const items = await this.orderItemsService.create(
            body.order_items.map((i) => ({
                product_title:i.product_title,
                price:i.price,
                quantity:i.quantity,
                product:  i.product_id
            }))
        );

        return this.orderService.create({
            user: id,
            order_items: items,
            total: body.total
        });
    }

   

    
}
