import { CountryIso } from '@meta/area'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol } from '@server/db'

export type UpdateDependantsProps = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  user: User
  colName: string
  originalDataPoint: OriginalDataPoint
  client: BaseProtocol
}
