import { ADMIN_KEY, USER_KEY } from '@/common/constants/roles-key.constant';
import { UserRole } from '@/common/enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, UserRole.ADMIN);
