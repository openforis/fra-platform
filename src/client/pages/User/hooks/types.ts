import { User } from 'meta/user/user'

import { EditUserRules } from 'client/pages/User/hooks/useEditUserRules'

export type PropsFormDefinition = {
  editUserRules: EditUserRules
  targetUser?: User
}
