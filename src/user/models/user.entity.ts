import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    firstname: string;
    
    @Column({nullable:true})
    lastname: string;

    @Column()
    image: string = "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
    @Column()
    address: string;

    @Column({unique: true})
    email:string;

    @Column()
    @Exclude()
    password: string;

}