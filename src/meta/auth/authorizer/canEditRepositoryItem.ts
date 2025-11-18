import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { canEditCountryProps } from 'meta/auth/authorizer/canEditCountryProps'
import { User } from 'meta/user/user'

export const canEditRepositoryItem = (props: { cycle: Cycle; country: Country; user: User }): boolean => {
  return canEditCountryProps({ ...props, allowCollaborator: true })
}
