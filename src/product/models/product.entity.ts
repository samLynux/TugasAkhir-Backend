import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;
    @Column()
    description:string;
    @Column()
    image:string;
    @Column()
    price:number;


    @Column()
    category:string;
    @Column()
    size:string;
    @Column()
    brand:string;
    @Column()
    primaryColor:string;
    @Column()
    secondaryColor:string;
}