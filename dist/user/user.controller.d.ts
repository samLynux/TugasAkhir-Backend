import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserCreateDTO } from 'src/auth/models/user-create.dto';
import { UserUpdateDTO } from 'src/auth/models/user-update.dto';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreference } from './models/user-preferences.entity';
export declare class UserController {
    private userService;
    private userPrefService;
    private authService;
    constructor(userService: UserService, userPrefService: UserPreferencesService, authService: AuthService);
    all(page?: number): Promise<PaginatedResult>;
    create(body: UserCreateDTO): Promise<User>;
    get(id: number): Promise<any>;
    updateInfo(request: Request, body: UserUpdateDTO): Promise<any>;
    updatePassword(request: Request, password: string, password_confirm: string): Promise<any>;
    update(id: number, body: UserUpdateDTO): Promise<any>;
    updatePref(body: UserPreference, request: Request): Promise<any>;
    addFav(ids: number[], request: Request): Promise<any>;
    delete(id: number): Promise<any>;
}
