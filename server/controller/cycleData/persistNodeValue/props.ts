import { Assessment, Cycle, NodeValue } from '@meta/assessment'
import { CountryIso } from '@meta/area'
import { User } from '@meta/user'

export type Props = {
  assessment: Assessment
  countryIso: CountryIso
  colName: string
  cycle: Cycle
  tableName: string
  user: User
  variableName: string
  value: NodeValue
}
