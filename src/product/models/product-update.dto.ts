import {  Entity } from "typeorm";

@Entity('products')
export class ProductUpdateDTO{
    title?: string;
    description?:string;
    image?:string;
    price?:number;

    category?:string;
    size?:string;
    brand?:string;
    primaryColor?:string;
    secondaryColor?:string;
}