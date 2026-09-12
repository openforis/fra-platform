import { TableValidationTestCase } from '../../types'
import { bamboo } from './bamboo'
import { mangroves } from './mangroves'
import { rubberWood } from './rubber_wood'

export const specificForestCategories: Array<TableValidationTestCase> = [...bamboo, ...mangroves, ...rubberWood]
