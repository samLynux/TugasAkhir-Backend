import { OrderService } from './order.service';
import { Request } from 'express';
import { OrderItemsService } from './order-items.service';
import { AuthService } from 'src/auth/auth.service';
import { OrderCreateDTO } from './order.entity.create.dto';
export declare class OrderController {
    private orderService;
    private orderItemsService;
    private authService;
    constructor(orderService: OrderService, orderItemsService: OrderItemsService, authService: AuthService);
    all(page: number, request: Request): Promise<import("../common/paginate-result.interface").PaginatedResult>;
    allWithProducts(page: number, request: Request): Promise<import("../common/paginate-result.interface").PaginatedResult>;
    transactionDetails(id: number): Promise<any>;
    create(body: OrderCreateDTO, request: Request): Promise<any>;
    chart(request: Request): Promise<any>;
}
