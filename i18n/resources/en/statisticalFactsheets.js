module.exports = {
  noData: 'No data',
  rowName: {
    forest_area: 'Forest area',
    natural_forest_area: 'Natural regenerating forest',
    planted_forest: '$t(forestCharacteristics.plantedForest)',
    forest_area_within_protected_areas: '$t(forestAreaWithinProtectedAreas.header)',
    land_area: 'Land area',
    primary_forest: '$t(specificForestCategories.primaryForest)',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_area: 'Other area',
    other_forest: 'Other forest',
    other_or_unknown: 'Other or unknown',
  },
  forestArea: {
    title: 'Forest Area (1990 — 2020)',
  },
  carbonAndGrowingStock: {
    title: 'Forest growing stock and carbon (1990 — 2020)',
    rowName: '',
    carbon_stock_biomass_total: 'Carbon stock in biomass',
    carbon_stock_total: 'Total carbon stock',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: 'Forest area % of land area (2020)',
  },
  primaryForest: {
    title: 'Primary forest % of forest area (2020)',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) (2015)',
    public: 'Public',
    private: 'Private',
  },
  forestAreaWithinProtectedAreas: {
    title: 'Forest area within protected areas 2020 (% of forest area)',
  },
  primaryDesignatedManagementObjective: {
    title: '$t(designatedManagementObjective.primaryDesignatedManagementObjective) (1990 — 2020)',
    rowName: '',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(common.other)',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    social_services: '$t(designatedManagementObjective.socialServices)',
  },
  naturallyRegeneratingForest: {
    title: 'Naturally regenerating forest area (1990 — 2020)',
  },
}
