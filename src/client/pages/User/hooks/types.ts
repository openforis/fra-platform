import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { FormDefinitionLabels } from 'client/components/Form/types'
import { EditUserRules } from 'client/pages/User/hooks/useEditUserRules'

export type PropsFormDefinition = {
  editUserRules: EditUserRules
  labels?: FormDefinitionLabels
  targetUser?: User

  // ========================================================
  // Pass countryIso and Cycle when handling invitation page.
  // Otherwise, country iso is read from url
  countryIso?: CountryIso
  cycle?: Cycle
}
