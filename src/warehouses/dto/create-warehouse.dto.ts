import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWarehouseDto {
    @IsString()
    @IsNotEmpty()
    warehouse_name: string

    @IsOptional()
    @IsString()
    description: string

}
