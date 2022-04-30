import { ProductCreateDTO } from './models/product-create.dto';
import { ProductUpdateDTO } from './models/product-update.dto';
import { Gender } from './models/product.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(page?: number): Promise<import("../common/paginate-result.interface").PaginatedResult>;
    filtered({ categories, brands, size, colors, gender }: {
        categories: string[];
        brands: string[];
        colors: string[];
        size: string;
        gender: Gender;
    }): Promise<{
        data: any[];
    }>;
    create(body: ProductCreateDTO, ids?: number[]): Promise<any>;
    get(id: number): Promise<any>;
    update(id: number, body: ProductUpdateDTO, ids?: number[]): Promise<any>;
    delete(id: number): Promise<any>;
}
