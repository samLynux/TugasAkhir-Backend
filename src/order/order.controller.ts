import { ClassSerializerInterceptor, Controller, Get, Post,Res, Query, UseGuards, UseInterceptors, Body, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import { OrderItemsService } from './order-items.service';
import { AuthService } from 'src/auth/auth.service';
import { OrderCreateDTO } from './order.entity.create.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
    constructor(
        private orderService:OrderService,
        private orderItemsService: OrderItemsService,
        private authService: AuthService,
        ){

    }


    @Get('orders')
    @UseGuards(AuthGuard)
    async all(@Query('page')page: number = 1, @Req() request: Request){
        const id = await this.authService.userId(request);
        // return this.orderService.find(id)
        return this.orderService.paginate(page, ['order_items',], {
            user: { id: id},
        });
    }

    @Post('orders')
    @UseGuards(AuthGuard)
    async create(@Body() body: OrderCreateDTO, @Req() request: Request){
        const id = await this.authService.userId(request);
 
        const items = await this.orderItemsService.create(body.order_items);

        return this.orderService.create({
            user: id,
            order_items: items,
            total: body.total
        });
    }

   

    @Get('chart')
    async chart(){
        return this.orderService.chart();
    }
}
