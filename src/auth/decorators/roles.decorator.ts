import { UserRole } from '@/common/enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';

export const RolesAccess = (...roles: Array< keyof typeof UserRole >) => SetMetadata(UserRole, roles);
