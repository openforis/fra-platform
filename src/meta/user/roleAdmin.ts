import { RoleName, UserRole } from 'meta/user/userRole'

export type RoleAdmin = UserRole<RoleName> & { email: string }
