import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UserPreferencesService } from './user-preferences.service';

@Injectable()
export class UserService extends AbstractService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private userPrefService: UserPreferencesService,
    ) {
        super(userRepository);
    }


    async paginate(page: number = 1, relations: any[] = []): Promise<PaginatedResult>{
        const {data, meta} = await super.paginate(page, relations)

        return {
            data : data.map(user => {
                const {password, ...data} = user;
                return data;
            }),
            meta
        };
    }

    async createPreference(user: User){
        await this.userPrefService.create({
            user: user,
        });
        
    }


}
