import { ExpressionContext } from '@openforis/arena-core'
import { TFunction } from 'i18next'

import { Country, CountryIso } from 'meta/area'
import { Assessment, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { RecordCountryData } from 'meta/data'

export interface Context extends ExpressionContext {
  assessments?: RecordAssessments
  assessment: Assessment
  cycle: Cycle
  colName: string
  countryIso: CountryIso
  country?: Country
  data: RecordCountryData
  formula: string
  row: Row
  t?: TFunction
}
