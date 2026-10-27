import { TableValidationTestCase } from '../../../types'
import { boreal } from './boreal'
import { subTropical } from './sub_tropical'
import { temperate } from './temperate'
import { tropical } from './tropical'

export const climaticDomain: Array<TableValidationTestCase> = [...boreal, ...subTropical, ...temperate, ...tropical]
