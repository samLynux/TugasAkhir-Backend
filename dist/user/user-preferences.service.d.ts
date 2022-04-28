import { AbstractService } from 'src/common/abstract.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { UserPreference } from './models/user-preferences.entity';
export declare class UserPreferencesService extends AbstractService {
    private productService;
    private readonly userPrefRepository;
    constructor(productService: ProductService, userPrefRepository: Repository<UserPreference>);
    findIdByUserId(id: number): Promise<any>;
    addFav(id: number, product_id: number): Promise<any>;
    removeFav(id: number, product_id: number): Promise<any>;
}
