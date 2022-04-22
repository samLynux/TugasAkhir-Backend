import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginate-result.interface';

@Injectable()
export abstract class AbstractService {
    protected constructor(protected readonly repository: Repository<any>){

    }

    async all(relations: any[] = []): Promise<any[]>{
        return this.repository.find({relations});
    }

    async paginate(page: number = 1, relations: any[] = [], where: any = null):Promise<PaginatedResult>{
        const take = 15;

        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page-1) * take,
            relations,
            where
        });
        return {
            data : data,
            meta: {
                total, 
                page,
                lastpage: Math.ceil(total/take)
            }
        };
    }

    async create(data): Promise<any>{
        return this.repository.save(data);
    }

    async findOne(condition, relations: any[] = []):Promise<any>{
        return this.repository.findOne(condition, {relations});
    }

    

    async update(id: number, data):Promise<any>{
        return this.repository.update(id, data);
    }

    async delete(id: number):Promise<any>{
        return this.repository.delete(id);
    }
}
