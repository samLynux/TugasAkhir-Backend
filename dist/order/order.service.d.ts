import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    paginate(page: number, relations: any[], where: any): Promise<PaginatedResult>;
    chart(): Promise<any>;
}
