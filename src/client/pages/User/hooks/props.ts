import { User } from 'meta/user'

import { EditUserRules } from 'client/pages/User/hooks/useEditUserRules'

export type Props = {
  editUserRules: EditUserRules
  targetUser: User
}
