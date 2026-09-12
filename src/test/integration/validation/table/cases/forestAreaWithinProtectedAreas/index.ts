import { TableValidationTestCase } from '../../types'
import { forestAreaWithLongTermManagementPlan } from './forest_area_with_long_term_management_plan'
import { forestAreaWithinProtectedAreas as forestAreaWithinProtectedAreasVariable } from './forest_area_within_protected_areas'
import { ofWhichInProtectedAreas } from './of_which_in_protected_areas'

export const forestAreaWithinProtectedAreas: Array<TableValidationTestCase> = [
  ...forestAreaWithinProtectedAreasVariable,
  ...forestAreaWithLongTermManagementPlan,
  ...ofWhichInProtectedAreas,
]
