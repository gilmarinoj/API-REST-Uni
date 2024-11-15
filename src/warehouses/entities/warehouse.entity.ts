import { BaseEntity } from "./../../common/config/base.entity";
import { StockEntity } from "../../stocks/entities/stock.entity"
import { Column, Entity, JoinColumn, OneToMany } from "typeorm"

@Entity('warehouse')
export class WarehouseEntity extends BaseEntity{

    @Column({type: "varchar"})
    name: string

    @Column({type: "varchar"})
    description?: string

    @OneToMany(() => StockEntity, (stocks) => stocks.warehouses)
    stocks: StockEntity[];
}
