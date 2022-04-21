import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { User } from "src/user/models/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";


@Entity('orders')
export class OrderCreateDTO{
    
    @IsNotEmpty()
    total: number;
    

    @IsNotEmpty()
    order_items:OrderItem[]




    
}
