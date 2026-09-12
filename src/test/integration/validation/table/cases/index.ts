import { TableValidationTestCase } from '../types'
import { areaAffectedByFire } from './areaAffectedByFire'
import { areaOfPermanentForestEstate } from './areaOfPermanentForestEstate'
import { climaticDomain } from './climaticDomain'
import { contactPersons } from './contactPersons'
import { degradedForestMonitoring2025 } from './degradedForestMonitoring2025'
import { disturbances } from './disturbances'
import { extentOfForest } from './extentOfForest'
import { forestAreaChange } from './forestAreaChange'
import { forestAreaWithinProtectedAreas } from './forestAreaWithinProtectedAreas'
import { forestCharacteristics } from './forestCharacteristics'
import { forestOwnership } from './forestOwnership'
import { growingStockTotal } from './growingStockTotal'
import { holderOfManagementRights } from './holderOfManagementRights'
import { nonWoodForestProductsRemovals } from './nonWoodForestProductsRemovals'
import { otherLandWithTreeCover } from './otherLandWithTreeCover'
import { primaryDesignatedManagementObjective } from './primaryDesignatedManagementObjective'
import { primaryForestByClimaticDomain } from './primaryForestByClimaticDomain'
import { specificForestCategories } from './specificForestCategories'
import { sustainableDevelopment1511 } from './sustainableDevelopment15_1_1'
import { sustainableDevelopment15211 } from './sustainableDevelopment15_2_1_1'
import { sustainableDevelopment15213 } from './sustainableDevelopment15_2_1_3'
import { sustainableDevelopment15214 } from './sustainableDevelopment15_2_1_4'
import { totalAreaWithDesignatedManagementObjective } from './totalAreaWithDesignatedManagementObjective'

export const cases: Array<TableValidationTestCase> = [
  ...areaAffectedByFire,
  ...areaOfPermanentForestEstate,
  ...climaticDomain,
  ...contactPersons,
  ...degradedForestMonitoring2025,
  ...disturbances,
  ...extentOfForest,
  ...forestAreaChange,
  ...forestAreaWithinProtectedAreas,
  ...forestCharacteristics,
  ...forestOwnership,
  ...growingStockTotal,
  ...holderOfManagementRights,
  ...nonWoodForestProductsRemovals,
  ...otherLandWithTreeCover,
  ...primaryDesignatedManagementObjective,
  ...primaryForestByClimaticDomain,
  ...specificForestCategories,
  ...sustainableDevelopment1511,
  ...sustainableDevelopment15211,
  ...sustainableDevelopment15213,
  ...sustainableDevelopment15214,
  ...totalAreaWithDesignatedManagementObjective,
]
