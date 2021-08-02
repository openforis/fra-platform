// ======= FRA section specs
// 0
import contactPersons from '@webapp/sectionSpec/fra/contactPersons/sectionSpec'
// 1
import extentOfForest from '@webapp/sectionSpec/fra/extentOfForest/sectionSpec'
import forestCharacteristics from '@webapp/sectionSpec/fra/forestCharacteristics/sectionSpec'
import specificForestCategories from '@webapp/sectionSpec/fra/specificForestCategories/sectionSpec'
import forestAreaChange from '@webapp/sectionSpec/fra/forestAreaChange/sectionSpec'
import annualReforestation from '@webapp/sectionSpec/fra/annualReforestation/sectionSpec'
import otherLandWithTreeCover from '@webapp/sectionSpec/fra/otherLandWithTreeCover/sectionSpec'
// 2
import growingStock from '@webapp/sectionSpec/fra/growingStock/sectionSpec'
import growingStockComposition from '@webapp/sectionSpec/fra/growingStockComposition/sectionSpec'
import biomassStock from '@webapp/sectionSpec/fra/biomassStock/sectionSpec'
import carbonStock from '@webapp/sectionSpec/fra/carbonStock/sectionSpec'
// 3
import designatedManagementObjective from '@webapp/sectionSpec/fra/designatedManagementObjective/sectionSpec'
import forestAreaWithinProtectedAreas from '@webapp/sectionSpec/fra/forestAreaWithinProtectedAreas/sectionSpec'
// 4
import forestOwnership from '@webapp/sectionSpec/fra/forestOwnership/sectionSpec'
import holderOfManagementRights from '@webapp/sectionSpec/fra/holderOfManagementRights/sectionSpec'
// 5
import disturbances from '@webapp/sectionSpec/fra/disturbances/sectionSpec'
import areaAffectedByFire from '@webapp/sectionSpec/fra/areaAffectedByFire/sectionSpec'
import degradedForest from '@webapp/sectionSpec/fra/degradedForest/sectionSpec'
// 6
import forestPolicy from '@webapp/sectionSpec/fra/forestPolicy/sectionSpec'
import areaOfPermanentForestEstate from '@webapp/sectionSpec/fra/areaOfPermanentForestEstate/sectionSpec'
// 7
import employment from '@webapp/sectionSpec/fra/employment/sectionSpec'
import graduationOfStudents from '@webapp/sectionSpec/fra/graduationOfStudents/sectionSpec'
import nonWoodForestProductsRemovals from '@webapp/sectionSpec/fra/nonWoodForestProductsRemovals/sectionSpec'
// 8
import sustainableDevelopment from '@webapp/sectionSpec/fra/sustainableDevelopment/sectionSpec'

// Other
import contentCheck from '@webapp/sectionSpec/fra/contentCheck/sectionSpec'

import { SectionSpec } from '../sectionSpec'

const FRASpecs:Record<string, SectionSpec> = {
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
