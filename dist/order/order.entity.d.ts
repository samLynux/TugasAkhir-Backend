import { User } from "src/user/models/user.entity";
import { OrderItem } from "./models/order-item.entity";
export declare class Order {
    id: number;
    user: User;
    total: number;
    createdAt: string;
    order_items: OrderItem[];
}
