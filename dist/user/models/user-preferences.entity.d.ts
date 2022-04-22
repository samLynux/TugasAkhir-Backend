import { Product } from "src/product/models/product.entity";
import { User } from "./user.entity";
export declare class UserPreference {
    id: number;
    category?: string;
    size?: string;
    brand?: string;
    color?: string;
    user: User;
    favourites: Product[];
}
