import { Brand } from "src/common/models/brand.entity";
import { Category } from "src/common/models/category.entity";
import { Color } from "src/common/models/color.entity";
import { Size } from "src/common/models/size.entity";
export declare enum Gender {
    m = "m",
    f = "f",
    n = "n"
}
export declare class Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    popularity: number;
    gender: Gender;
    createdAt: string;
    primaryColor: Color;
    secondaryColor: Color;
    category: Category;
    brand: Brand;
    sizes: Size[];
}
