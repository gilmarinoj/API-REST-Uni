import { UserGender } from "@/common/enums/user-gender.enum";
import { UserRole } from "@/common/enums/user-role.enum";
import { UserEntity } from "@/users/entities/user.entity";
import { log } from "console";


export type OmitPassword = Omit<UserEntity, 'password'>;
export type PartialUser = Partial<UserEntity>;

export type RecordUser = Record<string, UserEntity>;


const users:RecordUser = {
    "user1" : {
        id: "user1",
        name: "Marino",
        age: 18,
        email: "email",
        password: "password",
        role: UserRole.USER,
        isActive: true,
        gender: UserGender.MALE,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}
