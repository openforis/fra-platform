import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { RecordAssessmentData } from 'meta/data/recordData'

import { ExpressionContext } from 'lib/expressionEvaluator/context'

export type BaseContext = {
  assessmentName: AssessmentName
  assessments: RecordAssessments
  cycleName: CycleName
}

export interface Context extends ExpressionContext, BaseContext {
  colName: ColName
  country?: Country
  countryIso: CountryIso
  data: RecordAssessmentData
  formula: string
  row: Row
}
