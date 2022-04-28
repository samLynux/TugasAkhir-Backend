import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService extends AbstractService{
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>
    ){
        super(orderRepository);
    }


    async paginate(page: number = 1, relations: any[] = [], where: any): Promise<PaginatedResult>{
        const {data, meta} = await super.paginate(page, relations, where)

        return {
            data : data.map((order: Order) => ({
                id: order.id,
                total: order.total,
                created_at: order.createdAt,
                order_items: order.order_items
            })),
            meta
        };
    }

    async chart(){
        return this.orderRepository.query(`SELECT DATE_FORMAT(o.createdat, '%Y-%m-%d') as date, sum(i.price * i.quantity) as sum 
            FROM orders o 
            JOIN order_items i on o.id = i.order_id
            GROUP BY date`)
    }

    

}
