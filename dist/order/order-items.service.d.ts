import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';
export declare class OrderItemsService extends AbstractService {
    private readonly orderItemsRepository;
    constructor(orderItemsRepository: Repository<OrderItem>);
}
