import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { MeasureName } from 'meta/measurement/measure'

// Variables omitted from this map will default to using their own names as measure names
export const variableToMeasures: Record<TableName, Record<VariableName, MeasureName>> = {
  areaAffectedByFire: {
    of_which_on_forest: 'areaAffectedByFireOfWhichOnForest',
    total_land_area_affected_by_fire: 'totalLandAreaAffectedByFire',
  },

  areaOfPermanentForestEstate: {
    area_of_permanent_forest_estate: 'areaOfPermanentForestEstate',
  },

  biomassStockAvg: {
    forest_above_ground: 'biomassStockAvgForestAboveGround',
    forest_below_ground: 'biomassStockAvgForestBelowGround',
    forest_deadwood: 'biomassStockAvgForestDeadwood',
  },

  biomassStockTotal: {
    forest_above_ground: 'biomassStockTotalForestAboveGround',
    forest_below_ground: 'biomassStockTotalForestBelowGround',
    forest_deadwood: 'biomassStockTotalForestDeadwood',
  },

  carbonStockAvg: {
    carbon_forest_above_ground: 'carbonStockAvgCarbonForestAboveGround',
    carbon_forest_below_ground: 'carbonStockAvgCarbonForestBelowGround',
    carbon_forest_deadwood: 'carbonStockAvgCarbonForestDeadwood',
    carbon_forest_litter: 'carbonStockAvgCarbonForestLitter',
    carbon_forest_soil: 'carbonStockAvgCarbonForestSoil',
  },

  carbonStockTotal: {
    carbon_forest_above_ground: 'carbonStockTotalCarbonForestAboveGround',
    carbon_forest_below_ground: 'carbonStockTotalCarbonForestBelowGround',
    carbon_forest_deadwood: 'carbonStockTotalCarbonForestDeadwood',
    carbon_forest_litter: 'carbonStockTotalCarbonForestLitter',
    carbon_forest_soil: 'carbonStockTotalCarbonForestSoil',
  },

  disturbances: {
    other: 'disturbancesOtherArea',
    severe_weather_events: 'severeWeatherEvents',
    total: 'disturbancesTotalArea',
    totalForestArea: 'disturbancesTotalForestArea',
  },

  forestAreaChange: {
    forest_expansion: 'forestExpansion',
    natural_expansion: 'naturalExpansion',
  },

  forestCharacteristics: {
    totalForestArea: 'forestCharacteristicsTotalForestArea',
  },

  forestPolicy: {
    existence_of_traceability_system: 'forestPolicyExistenceOfTraceabilitySystem',
    legislations_supporting_SFM: 'forestPolicyLegislationsSupportingSFM',
    platform_for_stakeholder_participation: 'forestPolicyPlatformForStakeholderParticipation',
    policies_supporting_SFM: 'forestPolicyPoliciesSupportingSFM',
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
    other_or_unknown: 'forestOwnershipOtherOrUnknown',
    other: 'forestOwnershipOtherArea',
    private_ownership: 'privateOwnership',
    public_ownership: 'publicOwnership',
    total: 'forestOwnershipTotalArea',
    totalForestArea: 'forestOwnershipTotalForestArea',
    unknown: 'forestOwnershipUnknownArea',
  },

  holderOfManagementRights: {
    communities: 'holderOfManagementRightsCommunities',
    individuals: 'holderOfManagementRightsIndividuals',
    other: 'holderOfManagementRightsOtherArea',
    other2025: 'holderOfManagementRightsOtherArea2025',
    private_businesses: 'holderOfManagementRightsPrivateBusinesses',
    public_administration: 'holderOfManagementRightsPublicAdministration',
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
    totalForestArea: 'primaryDesignatedManagementObjectiveTotalForestArea',
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

export const measureToVariables: Record<MeasureName, VariableName> = Object.values(variableToMeasures).reduce<
  Record<MeasureName, VariableName>
>((acc, measures) => {
  Object.entries(measures).forEach(([variableName, measureName]) => {
    acc[measureName as MeasureName] = variableName as VariableName
  })
  return acc
}, {})
