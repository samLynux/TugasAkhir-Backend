import { Exclude } from "class-transformer";
import { Category } from "src/common/models/category.entity";
import { Product } from "src/product/models/product.entity";
import { Column, Entity, JoinColumn,  JoinTable,  ManyToMany,  OneToMany,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("user-preferences")
export class UserPreference{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Category)
    @JoinTable({
        name: "userprefs_category",
        joinColumn: {
            name: "userprefs_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
    }})
    categories:Category[];
    
    @Column({nullable: true})
    size?:string;

    @Column({nullable: true})
    brand?:string;
    
    @Column({nullable: true})
    color?:string;

    @OneToOne(() => User)
    @JoinColumn({name:'user_id'})
    user:User;

    @ManyToMany(() => Product, )
    @JoinTable({
        name:'user_favourites',
        joinColumn:{name:"user_pref_id", referencedColumnName:"id"},
        inverseJoinColumn:{name:"product_id", referencedColumnName:"id"}
    })
    favourites:Product[];

}