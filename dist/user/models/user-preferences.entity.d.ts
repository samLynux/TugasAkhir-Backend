import { Brand } from "src/common/models/brand.entity";
import { Color } from "src/common/models/color.entity";
import { Size } from "src/common/models/size.entity";
import { Product } from "src/product/models/product.entity";
import { User } from "./user.entity";
export declare enum Gender {
    m = "m",
    f = "f",
    n = "n"
}
export declare class UserPreference {
    id: number;
    size: Size;
    brands: Brand[];
    colors: Color[];
    gender: Gender;
    user: User;
    favourites: Product[];
}
