import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UserPreferencesService } from './user-preferences.service';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    private userPrefService;
    constructor(userRepository: Repository<User>, userPrefService: UserPreferencesService);
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
    createPreference(user: User): Promise<void>;
}
