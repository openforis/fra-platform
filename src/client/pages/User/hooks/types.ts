import { User } from 'meta/user'

import { EditUserRules } from 'client/pages/User/hooks/useEditUserRules'

export type PropsFormDefinition = {
  editUserRules: EditUserRules
  targetUser?: User
}
