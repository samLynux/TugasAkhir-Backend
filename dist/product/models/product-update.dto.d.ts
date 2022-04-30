import { Gender } from "./product.entity";
export declare class ProductUpdateDTO {
    title?: string;
    description?: string;
    image?: string;
    price?: number;
    gender?: Gender;
    category?: number;
    size?: number[];
    brand?: number;
    primaryColor?: number;
    secondaryColor?: number;
}
