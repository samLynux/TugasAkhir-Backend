import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Injectable()
export class OrderItemsService extends AbstractService{
    constructor(
        @InjectRepository(OrderItem) private readonly orderItemsRepository: Repository<OrderItem>
    ){
        super(orderItemsRepository);
    }




}
