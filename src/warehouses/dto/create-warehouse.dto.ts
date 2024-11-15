import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWarehouseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    description: string

}
