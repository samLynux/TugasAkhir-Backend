import { IsEmail, IsNotEmpty } from "class-validator";

export class UserCreateDTO{


    @IsNotEmpty()
    @IsEmail()
    email:string;

    
}