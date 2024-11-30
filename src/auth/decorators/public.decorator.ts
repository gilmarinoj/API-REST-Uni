import { PUBLIC_KEY, USER_KEY } from '@/common/constants/roles-key.constant';
import { UserRole } from '@/common/enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
