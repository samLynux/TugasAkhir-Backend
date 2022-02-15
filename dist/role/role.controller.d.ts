import { RoleService } from './role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    all(): Promise<any[]>;
    get(id: number): Promise<any>;
    create(name: String, ids: number[]): Promise<any>;
    update(id: number, name: String, ids: number[]): Promise<any>;
    delete(id: number): Promise<any>;
}
