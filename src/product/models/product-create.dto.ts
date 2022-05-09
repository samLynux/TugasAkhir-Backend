import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";
import { Gender } from "./product.entity";


export class ProductCreateDTO{

    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description:string;
    
    @Column( )
    image:string;
    @IsNotEmpty()
    price:number;
    gender?:Gender;
    
    category?:number;
    size?:number[];
    brand?:number;
    primaryColor?:number;
    secondaryColor?:number;
}