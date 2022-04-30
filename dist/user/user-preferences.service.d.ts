import { AbstractService } from 'src/common/abstract.service';
import { Brand } from 'src/common/models/brand.entity';
import { Category } from 'src/common/models/category.entity';
import { Color } from 'src/common/models/color.entity';
import { Size } from 'src/common/models/size.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { UserPreference } from './models/user-preferences.entity';
export declare class UserPreferencesService extends AbstractService {
    private productService;
    private readonly userPrefRepository;
    private readonly categoryRepository;
    private readonly brandRepository;
    private readonly colorRepository;
    private readonly sizeRepository;
    constructor(productService: ProductService, userPrefRepository: Repository<UserPreference>, categoryRepository: Repository<Category>, brandRepository: Repository<Brand>, colorRepository: Repository<Color>, sizeRepository: Repository<Size>);
    findColors(name: string[]): Promise<Color[]>;
    findCategories(name: string[]): Promise<Category[]>;
    findBrands(name: string[]): Promise<Brand[]>;
    findSize(name: string): Promise<Size>;
    addFav(id: number, product_id: number): Promise<any>;
    removeFav(id: number, product_id: number): Promise<any>;
    forUser(id: number): Promise<any[]>;
}
