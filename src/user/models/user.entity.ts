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

    @Column({nullable:true})
    image: string;

    @Column({nullable:true})
    address: string;

    @Column({unique: true})
    email:string;

    @Column()
    @Exclude()
    password: string;

}