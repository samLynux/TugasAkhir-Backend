import { IsNotEmpty } from "class-validator";
import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./product.entity";


@Entity('productsCreate')
export class ProductCreateDTO{

    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description:string;
    
    @Column( )
    image:string = "http://localhost:3000/api/default_image/default_product.png";
    @IsNotEmpty()
    price:number;
    gender?:Gender;
    
    category?:number;
    size?:number[];
    brand?:number;
    primaryColor?:number;
    secondaryColor?:number;
}