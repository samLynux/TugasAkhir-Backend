import { OrderService } from './order.service';
import { Request } from 'express';
import { OrderItemsService } from './order-items.service';
import { AuthService } from 'src/auth/auth.service';
import { OrderCreateDTO } from './models/order.create.dto';
export declare class OrderController {
    private orderService;
    private orderItemsService;
    private authService;
    constructor(orderService: OrderService, orderItemsService: OrderItemsService, authService: AuthService);
    chart(request: Request): Promise<any>;
    all(request: Request): Promise<any[]>;
    transactionDetails(id: number): Promise<any>;
    create(body: OrderCreateDTO, request: Request): Promise<any>;
}
