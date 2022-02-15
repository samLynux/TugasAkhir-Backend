import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
export class ProductCreateDTO{

    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description:string;
    @IsNotEmpty()
    image:string;
    @IsNotEmpty()
    price:number;
}