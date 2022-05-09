import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    paginate(page: number, relations: any[], where: any): Promise<PaginatedResult>;
    chart(id: number): Promise<any>;
}
