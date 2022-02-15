import { ProductCreateDTO } from './models/product-create.dto';
import { ProductUpdateDTO } from './models/product-update.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(page?: number): Promise<import("../common/paginate-result.interface").PaginatedResult>;
    create(body: ProductCreateDTO): Promise<any>;
    get(id: number): Promise<any>;
    update(id: number, body: ProductUpdateDTO): Promise<any>;
    delete(id: number): Promise<any>;
}
