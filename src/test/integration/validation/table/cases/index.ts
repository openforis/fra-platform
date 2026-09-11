import { TableValidationTestCase } from '../types'
import { ofWhichOnForest } from './areaAffectedByFire/of_which_on_forest'
import { totalLandAreaAffectedByFire } from './areaAffectedByFire/total_land_area_affected_by_fire'
import { areaOfPermanentForestEstate } from './areaOfPermanentForestEstate/area_of_permanent_forest_estate'
import { boreal } from './climaticDomain/boreal'
import { subTropical } from './climaticDomain/sub_tropical'
import { temperate } from './climaticDomain/temperate'
import { tropical } from './climaticDomain/tropical'
import { expectedYearForNextCountryReportUpdate } from './contactPersons/expectedYearForNextCountryReportUpdate'
import { degradedAreaForThatYear } from './degradedForestMonitoring2025/degradedAreaForThatYear'
import { yearOfLatestAssessment } from './degradedForestMonitoring2025/yearOfLatestAssessment'
import { diseases } from './disturbances/diseases'
import { insects } from './disturbances/insects'
import { other } from './disturbances/other'
import { severeWeatherEvents } from './disturbances/severe_weather_events'
import { forestArea } from './extentOfForest/forestArea'
import { otherLand } from './extentOfForest/otherLand'
import { otherWoodedLand } from './extentOfForest/otherWoodedLand'
import { afforestation } from './forestAreaChange/afforestation'
import { deforestation } from './forestAreaChange/deforestation'
import { forestExpansion } from './forestAreaChange/forest_expansion'
import { forestAreaNetChange } from './forestAreaChange/forestAreaNetChange'
import { naturalExpansion } from './forestAreaChange/natural_expansion'
import { forestAreaWithLongTermManagementPlan } from './forestAreaWithinProtectedAreas/forest_area_with_long_term_management_plan'
import { forestAreaWithinProtectedAreas } from './forestAreaWithinProtectedAreas/forest_area_within_protected_areas'
import { ofWhichInProtectedAreas } from './forestAreaWithinProtectedAreas/of_which_in_protected_areas'
import { plantationForestIntroducedArea } from './forestCharacteristics/plantationForestIntroducedArea'
import { primaryForest } from './forestCharacteristics/primaryForest'
import { totalForestArea } from './forestCharacteristics/totalForestArea'
import { ofWhichByCommunities } from './forestOwnership/of_which_by_communities'
import { ofWhichByIndividuals } from './forestOwnership/of_which_by_individuals'
import { ofWhichByPrivateBusinesses } from './forestOwnership/of_which_by_private_businesses'
import { total } from './forestOwnership/total'
import { unknown as forestOwnershipUnknown } from './forestOwnership/unknown'
import { forest } from './growingStockTotal/forest'
import { naturallyRegeneratingForest } from './growingStockTotal/naturallyRegeneratingForest'
import { otherPlantedForest } from './growingStockTotal/otherPlantedForest'
import { plantationForest } from './growingStockTotal/plantationForest'
import { plantationForestIntroducedArea as growingStockPlantationForestIntroducedArea } from './growingStockTotal/plantationForestIntroducedArea'
import { plantedForest } from './growingStockTotal/plantedForest'
import { primaryForest as growingStockPrimaryForest } from './growingStockTotal/primaryForest'
import { unknown as holderOfManagementRightsUnknown } from './holderOfManagementRights/unknown'
import { product1 } from './nonWoodForestProductsRemovals/product_1'
import { product2 } from './nonWoodForestProductsRemovals/product_2'
import { product3 } from './nonWoodForestProductsRemovals/product_3'
import { product4 } from './nonWoodForestProductsRemovals/product_4'
import { product5 } from './nonWoodForestProductsRemovals/product_5'
import { product6 } from './nonWoodForestProductsRemovals/product_6'
import { product7 } from './nonWoodForestProductsRemovals/product_7'
import { product8 } from './nonWoodForestProductsRemovals/product_8'
import { product9 } from './nonWoodForestProductsRemovals/product_9'
import { product10 } from './nonWoodForestProductsRemovals/product_10'
import { agroforestry } from './otherLandWithTreeCover/agroforestry'
import { other as otherLandWithTreeCoverOther } from './otherLandWithTreeCover/other'
import { palms } from './otherLandWithTreeCover/palms'
import { treeOrchards } from './otherLandWithTreeCover/tree_orchards'
import { treesInUrbanSettings } from './otherLandWithTreeCover/trees_in_urban_settings'
import { conservationOfBiodiversity } from './primaryDesignatedManagementObjective/conservation_of_biodiversity'
import { multipleUse } from './primaryDesignatedManagementObjective/multiple_use'
import { other as primaryDesignatedManagementObjectiveOther } from './primaryDesignatedManagementObjective/other'
import { production } from './primaryDesignatedManagementObjective/production'
import { protectionOfSoilAndWater } from './primaryDesignatedManagementObjective/protection_of_soil_and_water'
import { socialServices } from './primaryDesignatedManagementObjective/social_services'
import { totalForestArea as primaryDesignatedManagementObjectiveTotalForestArea } from './primaryDesignatedManagementObjective/totalForestArea'
import { unknown as primaryDesignatedManagementObjectiveUnknown } from './primaryDesignatedManagementObjective/unknown'

// TODO: Add cases at the end to avoid conflicting PRs
export const cases: Array<TableValidationTestCase> = [
  ...ofWhichOnForest,
  ...totalLandAreaAffectedByFire,
  ...areaOfPermanentForestEstate,
  ...boreal,
  ...subTropical,
  ...temperate,
  ...tropical,
  ...expectedYearForNextCountryReportUpdate,
  ...degradedAreaForThatYear,
  ...yearOfLatestAssessment,
  ...diseases,
  ...insects,
  ...other,
  ...severeWeatherEvents,
  ...forestArea,
  ...otherLand,
  ...otherWoodedLand,
  ...afforestation,
  ...naturalExpansion,
  ...deforestation,
  ...forestExpansion,
  ...forestAreaNetChange,
  ...forestAreaWithinProtectedAreas,
  ...forestAreaWithLongTermManagementPlan,
  ...ofWhichInProtectedAreas,
  ...plantationForestIntroducedArea,
  ...primaryForest,
  ...totalForestArea,
  ...ofWhichByCommunities,
  ...ofWhichByIndividuals,
  ...ofWhichByPrivateBusinesses,
  ...total,
  ...forestOwnershipUnknown,
  ...forest,
  ...naturallyRegeneratingForest,
  ...plantedForest,
  ...otherPlantedForest,
  ...plantationForest,
  ...growingStockPlantationForestIntroducedArea,
  ...growingStockPrimaryForest,
  ...holderOfManagementRightsUnknown,
  ...product1,
  ...product2,
  ...product3,
  ...product4,
  ...product5,
  ...product6,
  ...product7,
  ...product8,
  ...product9,
  ...product10,
  ...agroforestry,
  ...otherLandWithTreeCoverOther,
  ...palms,
  ...treeOrchards,
  ...treesInUrbanSettings,
  ...conservationOfBiodiversity,
  ...multipleUse,
  ...primaryDesignatedManagementObjectiveOther,
  ...production,
  ...protectionOfSoilAndWater,
  ...socialServices,
  ...primaryDesignatedManagementObjectiveTotalForestArea,
  ...primaryDesignatedManagementObjectiveUnknown,
]
