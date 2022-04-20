import { IsEmail, IsNotEmpty } from "class-validator";

export class UserCreateDTO{
    @IsNotEmpty()
    firstname:string;

    @IsNotEmpty()
    lastname:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    
}