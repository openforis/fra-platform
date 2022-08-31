import { ExpressionContext } from '@openforis/arena-core'

import { CountryIso } from '@meta/area'
import { Assessment, Row } from '@meta/assessment'
import { TableData } from '@meta/data'

export interface Context extends ExpressionContext {
  assessment: Assessment
  colName: string
  countryIso: CountryIso
  data: TableData
  row: Row
}
