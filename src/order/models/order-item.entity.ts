import { Product } from "src/product/models/product.entity";
import { Column, Entity, JoinColumn,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";


@Entity('order_items')
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    product_title:string;

    @Column()
    price:number;

    @Column()
    quantity:number;

    @ManyToOne(() => Order, order => order.order_items, {onDelete:"CASCADE"})
    @JoinColumn({name:'order_id'})
    order:Order;

    @ManyToOne(() => Product,)
    @JoinColumn({name:'product_id'})
    product:Product;

}