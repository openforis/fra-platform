import { TFunction } from 'i18next'

import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { RecordAssessmentData } from 'meta/data/recordData'

import { ExpressionContext } from 'lib/expressionEvaluator/context'

export type BaseContext = {
  assessments: RecordAssessments
  assessmentName: AssessmentName
  cycleName: CycleName
  country?: Country
}

export interface Context extends ExpressionContext, BaseContext {
  // assessments?: RecordAssessments
  // assessment: Assessment
  // cycle: Cycle
  colName: string
  countryIso: CountryIso
  // country?: Country
  data: RecordAssessmentData
  formula: string
  row: Row
  t?: TFunction
}
