import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { MeasureName } from 'meta/measurement/measure'

// Variables omitted from this map will default to using their own names as measure names
export const variableToMeasures: Record<TableName, Record<VariableName, MeasureName>> = {
  areaAffectedByFire: {
    of_which_on_forest: 'ofWhichOnForest',
    total_land_area_affected_by_fire: 'totalLandAreaAffectedByFire',
  },

  areaOfPermanentForestEstate: {
    area_of_permanent_forest_estate: 'areaOfPermanentForestEstate',
  },

  disturbances: {
    other: 'disturbancesOtherArea',
    severe_weather_events: 'severeWeatherEvents',
    total: 'disturbancesTotalArea',
  },

  forestAreaChange: {
    forest_expansion: 'forestExpansion',
    natural_expansion: 'naturalExpansion',
  },

  growingStockAvg: {
    forest: 'growingStockAvgForest',
    naturallyRegeneratingForest: 'growingStockAvgNaturallyRegeneratingForest',
    otherPlantedForest: 'growingStockAvgOtherPlantedForest',
    otherWoodedLand: 'growingStockAvgOtherWoodedLand',
    plantationForest: 'growingStockAvgPlantationForest',
    plantationForestIntroducedArea: 'growingStockAvgPlantationForestIntroducedArea',
    plantedForest: 'growingStockAvgPlantedForest',
    primaryForest: 'growingStockAvgPrimaryForest',
  },

  growingStockTotal: {
    forest: 'growingStockTotalForest',
    naturallyRegeneratingForest: 'growingStockTotalNaturallyRegeneratingForest',
    otherPlantedForest: 'growingStockTotalOtherPlantedForest',
    otherWoodedLand: 'growingStockTotalOtherWoodedLand',
    plantationForest: 'growingStockTotalPlantationForest',
    plantationForestIntroducedArea: 'growingStockTotalPlantationForestIntroducedArea',
    plantedForest: 'growingStockTotalPlantedForest',
    primaryForest: 'growingStockTotalPrimaryForest',
  },

  forestAreaWithinProtectedAreas: {
    forest_area_with_long_term_management_plan: 'forestAreaWithLongTermManagementPlan',
    forest_area_within_protected_areas: 'forestAreaWithinProtectedAreas',
    of_which_in_protected_areas: 'ofWhichInProtectedAreas',
  },

  forestOwnership: {
    of_which_by_communities: 'ofWhichByCommunities',
    of_which_by_individuals: 'ofWhichByIndividuals',
    of_which_by_private_businesses: 'ofWhichByPrivateBusinesses',
    other_or_unknown: 'otherOrUnknown',
    other: 'forestOwnershipOtherArea',
    private_ownership: 'privateOwnership',
    public_ownership: 'publicOwnership',
    total: 'forestOwnershipTotalArea',
    unknown: 'forestOwnershipUnknownArea',
  },

  holderOfManagementRights: {
    other: 'holderOfManagementRightsOtherArea',
    private_businesses: 'privateBusinesses',
    public_administration: 'publicAdministration',
    unknown: 'holderOfManagementRightsUnknownArea',
  },

  otherLandWithTreeCover: {
    other: 'otherLandWithTreeCoverOtherArea',
    tree_orchards: 'treeOrchards',
    trees_in_urban_settings: 'treesInUrbanSettings',
  },

  primaryDesignatedManagementObjective: {
    conservation_of_biodiversity: 'primaryDesignatedManagementObjectiveConservationOfBiodiversity',
    multiple_use: 'multipleUse',
    no_designation: 'noDesignation',
    no_unknown: 'noUnknown',
    other: 'primaryDesignatedManagementObjectiveOtherArea',
    production: 'primaryDesignatedManagementObjectiveProductionArea',
    protection_of_soil_and_water: 'primaryDesignatedManagementObjectiveProtectionOfSoilAndWater',
    social_services: 'primaryDesignatedManagementObjectiveSocialServices',
    unknown: 'primaryDesignatedManagementObjectiveUnknown',
  },

  specificForestCategories: {
    primary_forest: 'primaryForest',
    rubber_wood: 'rubberWood',
    temporarily_unstocked: 'temporarilyUnstocked',
  },

  totalAreaWithDesignatedManagementObjective: {
    conservation_of_biodiversity: 'totalAreaWithDesignatedManagementObjectiveConservationOfBiodiversity',
    other: 'totalAreaWithDesignatedManagementObjectiveOtherArea',
    production: 'totalAreaWithDesignatedManagementObjectiveProductionArea',
    protection_of_soil_and_water: 'totalAreaWithDesignatedManagementObjectiveProtectionOfSoilAndWater',
    social_services: 'totalAreaWithDesignatedManagementObjectiveSocialServices',
  },
}
