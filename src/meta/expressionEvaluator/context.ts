import { ExpressionContext } from '@openforis/arena-core'
import { TFunction } from 'i18next'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, RecordAssessments, Row } from 'meta/assessment'
import { RecordCountryData } from 'meta/data'

export interface Context extends ExpressionContext {
  assessments?: RecordAssessments
  assessment: Assessment
  cycle: Cycle
  colName: string
  countryIso: CountryIso
  data: RecordCountryData
  formula: string
  row: Row
  t?: TFunction
}
