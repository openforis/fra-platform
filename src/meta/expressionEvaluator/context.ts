import { ExpressionContext } from '@openforis/arena-core'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, Row } from '@meta/assessment'
import { TableData } from '@meta/data'

export interface Context extends ExpressionContext {
  assessment: Assessment
  cycle: Cycle
  colName: string
  countryIso: CountryIso
  data: TableData
  row: Row
}
