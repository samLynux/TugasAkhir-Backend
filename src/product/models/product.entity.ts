import { Brand } from "src/common/models/brand.entity";
import { Category } from "src/common/models/category.entity";
import { Color } from "src/common/models/color.entity";
import { Size } from "src/common/models/size.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
    m = "m",
    f = "f",
    n = "n"
}

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;
    @Column()
    description:string;
    @Column()
    image:string;
    @Column()
    price:number;
    @Column()
    popularity:number = 0;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.n
    })
    gender: Gender;

    @CreateDateColumn()
    createdAt:string;

    

    @ManyToOne(() => Color)
    @JoinColumn({name:'primary_color_id'})
    primaryColor:Color;
    @ManyToOne(() => Color)
    @JoinColumn({name:'secondary_color_id'})
    secondaryColor:Color;

    @ManyToOne(() => Category)
    @JoinColumn({name:'category_id'})
    category:Category;

    @ManyToOne(() => Brand)
    @JoinColumn({name:'brand_id'})
    brand:Brand;
    
    

    @ManyToMany(() => Size)
    @JoinTable({
        name: "product_sizes",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "size_id",
            referencedColumnName: "id"
    }})
    sizes:Size[];

    
}