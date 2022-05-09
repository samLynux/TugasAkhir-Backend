import { User } from "src/user/models/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";


@Entity('orders')
export class Order{

    @PrimaryGeneratedColumn()
    id:number;
    
   
    
    @ManyToOne(() => User)
    user:User;

    @Column()
    total: number;
    
    
    @CreateDateColumn()
    createdAt:string;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {cascade: true})
    order_items:OrderItem[]


    
    
}