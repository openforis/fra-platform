import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { canUserEditData } from './_canEditData/canUserEditData'

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
