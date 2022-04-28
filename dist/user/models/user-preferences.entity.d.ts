import { Category } from "src/common/models/category.entity";
import { Product } from "src/product/models/product.entity";
import { User } from "./user.entity";
export declare class UserPreference {
    id: number;
    categories: Category[];
    size?: string;
    brand?: string;
    color?: string;
    user: User;
    favourites: Product[];
}
