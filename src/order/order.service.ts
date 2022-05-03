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

    async chart(id: number){
        const result = this.orderRepository.query(`
            SELECT DATE_FORMAT(o.createdat, '%Y-%m') as date, SUM(o.total) as sum
                FROM orders o 
                WHERE o.userId = ${id} 
                GROUP BY date
        `)


        return result;
    }

    

}
