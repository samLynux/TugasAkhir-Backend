import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService extends AbstractService{
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ){
        super(productRepository);
    }

    async find(ids: number[]):Promise<any>{
        
        return  this.productRepository.createQueryBuilder()
        .where("id IN (:...ids)",  {id: ids});
       
        // return this.repository.fin d(condition);
    }
}
