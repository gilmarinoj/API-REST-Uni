import { BaseEntity } from "./../../common/config/base.entity";
import { Column, Entity } from "typeorm";

@Entity('category')
export class CategoryEntity extends BaseEntity {

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    description?: string;

}
