import { IsNotEmpty, IsString } from "class-validator";


export class CreatePaymentMethodDto {

    @IsString()
    @IsNotEmpty()
    payment_method: string;
}
