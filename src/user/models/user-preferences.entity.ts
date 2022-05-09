import { Brand } from "src/common/models/brand.entity";
import { Color } from "src/common/models/color.entity";
import { Size } from "src/common/models/size.entity";
import { Product } from "src/product/models/product.entity";
import { Column, Entity, JoinColumn,  JoinTable,  ManyToMany,  ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum Gender {
    m = "m",
    f = "f",
    n = "n"
}


@Entity("user-preferences")
export class UserPreference{
    @PrimaryGeneratedColumn()
    id: number;


    
    @ManyToOne(() => Size)
    @JoinColumn({name:'size_id'})
    size:Size;

    @ManyToMany(() => Brand)
    @JoinTable({
        name: "userprefs_brand",
        joinColumn: {
            name: "userprefs_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "brand_id",
            referencedColumnName: "id"
    }})
    brands:Brand[];
    
    @ManyToMany(() => Color)
    @JoinTable({
        name: "userprefs_color",
        joinColumn: {
            name: "userprefs_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "color_id",
            referencedColumnName: "id"
    }})
    colors:Color[];

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.n
    })
    gender: Gender;

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