import { TableValidationTestCase } from '../../../types'
import { inPrivateOwnership1990 } from './in_private_ownership_1990'
import { inPublicOwnership1990 } from './in_public_ownership_1990'
import { otherTypesOfOwnershipUnknown1990 } from './other_types_of_ownership_unknown_1990'

export const table61: Array<TableValidationTestCase> = [
  ...inPrivateOwnership1990,
  ...inPublicOwnership1990,
  ...otherTypesOfOwnershipUnknown1990,
]
