// ======= FRA section specs
// 0
import contactPersons from '../../sectionSpec/fra/contactPersons/sectionSpec'
// 1
import extentOfForest from '../../sectionSpec/fra/extentOfForest/sectionSpec'
import forestCharacteristics from '../../sectionSpec/fra/forestCharacteristics/sectionSpec'
import specificForestCategories from '../../sectionSpec/fra/specificForestCategories/sectionSpec'
import forestAreaChange from '../../sectionSpec/fra/forestAreaChange/sectionSpec'
import annualReforestation from '../../sectionSpec/fra/annualReforestation/sectionSpec'
import otherLandWithTreeCover from '../../sectionSpec/fra/otherLandWithTreeCover/sectionSpec'
// 2
import growingStock from '../../sectionSpec/fra/growingStock/sectionSpec'
import growingStockComposition from '../../sectionSpec/fra/growingStockComposition/sectionSpec'
import biomassStock from '../../sectionSpec/fra/biomassStock/sectionSpec'
import carbonStock from '../../sectionSpec/fra/carbonStock/sectionSpec'
// 3
import designatedManagementObjective from '../../sectionSpec/fra/designatedManagementObjective/sectionSpec'
import forestAreaWithinProtectedAreas from '../../sectionSpec/fra/forestAreaWithinProtectedAreas/sectionSpec'
// 4
import forestOwnership from '../../sectionSpec/fra/forestOwnership/sectionSpec'
import holderOfManagementRights from '../../sectionSpec/fra/holderOfManagementRights/sectionSpec'
// 5
import disturbances from '../../sectionSpec/fra/disturbances/sectionSpec'
import areaAffectedByFire from '../../sectionSpec/fra/areaAffectedByFire/sectionSpec'
import degradedForest from '../../sectionSpec/fra/degradedForest/sectionSpec'
// 6
import forestPolicy from '../../sectionSpec/fra/forestPolicy/sectionSpec'
import areaOfPermanentForestEstate from '../../sectionSpec/fra/areaOfPermanentForestEstate/sectionSpec'
// 7
import employment from '../../sectionSpec/fra/employment/sectionSpec'
import graduationOfStudents from '../../sectionSpec/fra/graduationOfStudents/sectionSpec'
import nonWoodForestProductsRemovals from '../../sectionSpec/fra/nonWoodForestProductsRemovals/sectionSpec'
// 8
import sustainableDevelopment from '../../sectionSpec/fra/sustainableDevelopment/sectionSpec'

// Other
import contentCheck from '../../sectionSpec/fra/contentCheck/sectionSpec'

import { SectionSpec } from '../sectionSpec'

const FRASpecs: Record<string, SectionSpec> = {
  // 0
  [contactPersons.sectionName]: contactPersons,
  // 1
  [extentOfForest.sectionName]: extentOfForest,
  [forestCharacteristics.sectionName]: forestCharacteristics,
  [specificForestCategories.sectionName]: specificForestCategories,
  [forestAreaChange.sectionName]: forestAreaChange,
  [annualReforestation.sectionName]: annualReforestation,
  [otherLandWithTreeCover.sectionName]: otherLandWithTreeCover,
  // 2
  [growingStock.sectionName]: growingStock,
  [growingStockComposition.sectionName]: growingStockComposition,
  [biomassStock.sectionName]: biomassStock,
  [carbonStock.sectionName]: carbonStock,
  // 3
  [designatedManagementObjective.sectionName]: designatedManagementObjective,
  [forestAreaWithinProtectedAreas.sectionName]: forestAreaWithinProtectedAreas,
  // 4
  [forestOwnership.sectionName]: forestOwnership,
  [holderOfManagementRights.sectionName]: holderOfManagementRights,
  // 5
  [disturbances.sectionName]: disturbances,
  [areaAffectedByFire.sectionName]: areaAffectedByFire,
  [degradedForest.sectionName]: degradedForest,
  // 6
  [forestPolicy.sectionName]: forestPolicy,
  [areaOfPermanentForestEstate.sectionName]: areaOfPermanentForestEstate,
  // 7
  [employment.sectionName]: employment,
  [graduationOfStudents.sectionName]: graduationOfStudents,
  [nonWoodForestProductsRemovals.sectionName]: nonWoodForestProductsRemovals,
  // 8
  [sustainableDevelopment.sectionName]: sustainableDevelopment,

  // Other
  [contentCheck.sectionName]: contentCheck,
}

export default FRASpecs
