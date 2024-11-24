import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCustomerDto {

    @IsString()
    @IsNotEmpty()
    customer_name: string

    @IsString()
    @IsNotEmpty()
    customer_contact: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsNumber()
    @IsNotEmpty()
    postal_code: number

    @IsString()
    @IsNotEmpty()
    country: string

}
