import { Exclude, Expose } from "class-transformer";
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

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items:OrderItem[]


    @Expose()
    get name():string{
        return `${this.user.firstname} ${this.user.lastname}`;
    }

    
}