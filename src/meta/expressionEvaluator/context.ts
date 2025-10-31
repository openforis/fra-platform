import { TFunction } from 'i18next'

import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { RecordAssessmentData } from 'meta/data'

import { ExpressionContext } from 'lib/expressionEvaluator/context'

export interface Context extends ExpressionContext {
  assessments?: RecordAssessments
  assessment: Assessment
  cycle: Cycle
  colName: string
  countryIso: CountryIso
  country?: Country
  data: RecordAssessmentData
  formula: string
  row: Row
  t?: TFunction
}
