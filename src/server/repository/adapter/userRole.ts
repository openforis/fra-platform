import { Objects } from 'utils/objects'

import { UserRole } from 'meta/user'

type UserRoleDB = Pick<UserRole, 'id' | 'uuid' | 'role' | 'props' | 'permissions'> & {
  assessment_uuid: string
  cycle_uuid: string
  country_iso: string
  user_uuid: string
  invitation_uuid: string
  created_at: string
}

export const UserRoleAdapter = (role: UserRoleDB) => Objects.camelize(role)
