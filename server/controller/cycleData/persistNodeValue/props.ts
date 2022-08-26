import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { NodeUpdate } from '@meta/data'
import { User } from '@meta/user'

export type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  sectionName?: string
  user: User
} & NodeUpdate
