import { IsNotEmpty } from "class-validator";
import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
export class ProductCreateDTO{

    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description:string;
    
    @Column( )
    image:string = "http://localhost:3000/api/default_image/default_product.png";
    @IsNotEmpty()
    price:number;

    
    category?:string;
    size?:string;
    brand?:string;
    primaryColor?:string;
    secondaryColor?:string;
}