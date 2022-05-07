import { OrderService } from './order.service';
import { Request } from 'express';
import { OrderItemsService } from './order-items.service';
import { AuthService } from 'src/auth/auth.service';
import { OrderCreateDTO } from './order.entity.create.dto';
import { ProductService } from 'src/product/product.service';
export declare class OrderController {
    private orderService;
    private orderItemsService;
    private authService;
    private productService;
    constructor(orderService: OrderService, orderItemsService: OrderItemsService, authService: AuthService, productService: ProductService);
    chart(request: Request): Promise<any>;
    all(request: Request): Promise<any[]>;
    transactionDetails(id: number): Promise<any>;
    create(body: OrderCreateDTO, request: Request): Promise<any>;
}
