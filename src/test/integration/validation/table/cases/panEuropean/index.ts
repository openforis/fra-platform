import { TableValidationTestCase } from '../../types'
import { table11b } from './table_1_1b'
import { table12a } from './table_1_2a'
import { table12b } from './table_1_2b'
import { table12c } from './table_1_2c'
import { table13a1 } from './table_1_3a1'
import { table13a2 } from './table_1_3a2'
import { table13b } from './table_1_3b'
import { table14a } from './table_1_4a'
import { table31 } from './table_3_1'

export const cases: Array<TableValidationTestCase> = [
  ...table11b,
  ...table12a,
  ...table12b,
  ...table12c,
  ...table13a1,
  ...table13a2,
  ...table13b,
  ...table14a,
  ...table31,
]
