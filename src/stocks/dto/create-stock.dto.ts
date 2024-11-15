import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStockDto {

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsString()
    @IsOptional()
    description: string
}
