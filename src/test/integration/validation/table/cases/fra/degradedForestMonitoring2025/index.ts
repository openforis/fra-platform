import { TableValidationTestCase } from '../../../types'
import { degradedAreaForThatYear } from './degradedAreaForThatYear'
import { yearOfLatestAssessment } from './yearOfLatestAssessment'

export const degradedForestMonitoring2025: Array<TableValidationTestCase> = [
  ...degradedAreaForThatYear,
  ...yearOfLatestAssessment,
]
