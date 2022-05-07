import {  Entity } from "typeorm";
import { Gender } from "./product.entity";

@Entity('productsUpdate')
export class ProductUpdateDTO{
    title?: string;
    description?:string;
    image?:string;
    price?:number;

    gender?:Gender;
    category?:number;
    size?:number[];
    brand?:number;
    primaryColor?:number;
    secondaryColor?:number;
}