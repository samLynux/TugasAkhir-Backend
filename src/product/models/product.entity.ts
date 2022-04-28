import { Brand } from "src/common/models/brand.entity";
import { Category } from "src/common/models/category.entity";
import { Size } from "src/common/models/size.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



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
    @CreateDateColumn()
    createdAt:string;

    

    @Column()
    primaryColor:string;
    @Column()
    secondaryColor:string;

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