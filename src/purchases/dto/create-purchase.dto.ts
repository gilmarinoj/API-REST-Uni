import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PurchaseStatus } from "src/common/enums/purchases-status.enum";

export class CreatePurchaseDto {

    @IsEnum(PurchaseStatus)
    @IsNotEmpty()
    status: PurchaseStatus;

    @IsNotEmpty()
    @IsString()
    paymentMethod: string
}
