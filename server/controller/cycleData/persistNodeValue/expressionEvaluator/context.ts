import { CountryIso } from '@meta/area'
import { TableData } from '@meta/data'
import { Assessment, Row } from '@meta/assessment'
import { ExpressionContext } from '@arena/core'

export interface Context extends ExpressionContext {
  assessment: Assessment
  colName: string
  countryIso: CountryIso
  data: TableData
  row: Row
}
