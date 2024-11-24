import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PurchaseStatus } from "@/common/enums/purchases-status.enum";

export class CreatePurchaseDto {

    @IsEnum(PurchaseStatus)
    @IsNotEmpty()
    status: PurchaseStatus;

    @IsNotEmpty()
    @IsString()
    payment_method: string

    @IsNotEmpty()
    @IsString()
    customer: string


}
