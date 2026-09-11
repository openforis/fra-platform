import { TableValidationTestCase } from '../../types'
import { ofWhichByCommunities } from './of_which_by_communities'
import { ofWhichByIndividuals } from './of_which_by_individuals'
import { ofWhichByPrivateBusinesses } from './of_which_by_private_businesses'
import { total } from './total'
import { unknown } from './unknown'

export const forestOwnership: Array<TableValidationTestCase> = [
  ...ofWhichByCommunities,
  ...ofWhichByIndividuals,
  ...ofWhichByPrivateBusinesses,
  ...total,
  ...unknown,
]
