import { IsNotEmpty } from "class-validator";


export class OrderCreateDTO{
    
    @IsNotEmpty()
    total: number;
    

    @IsNotEmpty()
    order_items:{
        product_title:string;
        price:number;
        quantity:number;
        product_id:number;
    }[]




    
}
