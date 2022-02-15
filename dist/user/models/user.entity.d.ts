import { Role } from "src/role/role.entity";
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
}
