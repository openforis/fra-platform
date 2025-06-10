import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  year: string
}

export const removeOriginalDataPoint = createAction<Props>('data/tableData/nodeValues/originalDataPoint/remove')
