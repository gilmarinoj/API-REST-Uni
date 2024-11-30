import { UserRole } from "@/common/enums/user-role.enum";

declare namespace Express {
    export interface Request {
        user: { id:string, email:string, role: UserRole },
    }
}