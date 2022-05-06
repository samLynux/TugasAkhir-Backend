import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserCreateDTO } from 'src/auth/models/user-create.dto';
import { UserUpdateDTO } from 'src/auth/models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { UserPreferencesService } from './user-preferences.service';
import { Gender } from './models/user-preferences.entity';
export declare class UserController {
    private userService;
    private userPrefService;
    private authService;
    constructor(userService: UserService, userPrefService: UserPreferencesService, authService: AuthService);
    userGet(request: Request): Promise<any>;
    create(body: UserCreateDTO): Promise<User>;
    getPrefs(request: Request): Promise<any>;
    getFavs(request: Request): Promise<any>;
    checkFavs(request: Request, product_id: number): Promise<boolean>;
    updateInfo(request: Request, { brands, size, colors, gender }: {
        brands: string[];
        colors: string[];
        size: string;
        gender: Gender;
    }): Promise<any>;
    update(body: UserUpdateDTO, request: Request): Promise<any>;
    addFav(product_id: number, request: Request): Promise<any>;
    delete(id: number): Promise<any>;
    forUser(request: Request): Promise<any[]>;
}
