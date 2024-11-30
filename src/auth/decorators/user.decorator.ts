import { USER_KEY } from '@/common/constants/roles-key.constant';
import { UserRole } from '@/common/enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';

export const UserAccess = () => SetMetadata(USER_KEY, UserRole.USER);
