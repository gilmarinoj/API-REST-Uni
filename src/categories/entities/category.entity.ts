import { ProductEntity } from "../../products/entities/product.entity";
import { BaseEntity } from "../../common/config/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('category')
export class CategoryEntity extends BaseEntity {

    @Column({type: "varchar"})
    category_name: string;

    @Column({type: "varchar"})
    description?: string;

    @OneToMany(() => ProductEntity, (products) => products.category)
    products: ProductEntity[];

}
