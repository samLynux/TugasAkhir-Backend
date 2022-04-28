import { Brand } from "src/common/models/brand.entity";
import { Category } from "src/common/models/category.entity";
import { Size } from "src/common/models/size.entity";
export declare class Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    popularity: number;
    createdAt: string;
    primaryColor: string;
    secondaryColor: string;
    category: Category;
    brand: Brand;
    sizes: Size[];
}
