import {  Entity } from "typeorm";

@Entity('products')
export class ProductUpdateDTO{
    title?: string;
    description?:string;
    image?:string;
    price?:number;
}