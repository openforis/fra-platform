import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { canUserEditData } from 'meta/auth/authorizer/_canEditData/canUserEditData'
import { User } from 'meta/user/user'

type Props = {
  country: Country
  cycle: Cycle
  user: User
}

/**
 * CanEditSomeData - Determines if the user can edit some data sections
 * (at least 1 tableData or 1 description for collaborators)
 */
export const canEditSomeData = (props: Props): boolean => {
  return canUserEditData(props)
}
