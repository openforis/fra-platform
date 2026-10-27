import { TableValidationTestCase } from '../../../types'
import { afforestation } from './afforestation'
import { deforestation } from './deforestation'
import { forestExpansion } from './forest_expansion'
import { forestAreaNetChange } from './forestAreaNetChange'
import { naturalExpansion } from './natural_expansion'

export const forestAreaChange: Array<TableValidationTestCase> = [
  ...afforestation,
  ...naturalExpansion,
  ...deforestation,
  ...forestExpansion,
  ...forestAreaNetChange,
]
