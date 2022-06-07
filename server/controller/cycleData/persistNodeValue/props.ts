import { CountryIso } from '@meta/area'
import { Assessment, Cycle, NodeValue } from '@meta/assessment'
import { User } from '@meta/user'

export type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  tableName: string
  variableName: string
  colName: string
  value: NodeValue
  user: User
}
