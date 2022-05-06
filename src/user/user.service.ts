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

    async register(email: string, password: string){
        const user = await this.create({
            email : email,
            password : password,
        });

        this.userPrefService.create({
            user: user
        })

        return user;
    }

    async updatePassword(email: string, data):Promise<any>{
        return this.repository.update({email}, data);
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

    


}
