module.exports = {
  noData: 'No data available',
  rowName: {
    area: 'Area',
    forest: 'Forest',
    protected: 'Protected',
    forestArea: 'Forest area',
    naturalForestArea: '$t(forestCharacteristics.naturalForestArea)',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'Land area',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    otherArea: 'Other area',
    otherForest: 'Other forest',
    private_ownership: 'Private',
    public_ownership: 'Public',
    other: '$t(common.other)',
    unknown: '$t(fra.forestOwnership.unknown2025)',
    other_or_unknown: 'Other or unknown',
  },
  forestArea: {
    title: 'Forest Area ({{startYear}} - {{endYear}}), $t({{unit}})',
  },
  carbonAndGrowingStock: {
    title: 'Forest growing stock and carbon ({{startYear}} - {{endYear}})',
    rowName: '',
    carbon_stock_biomass_total: 'Carbon stock in biomass ($t({{unit}}))',
    carbon_stock_total: 'Total carbon stock ($t({{unit}}))',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: 'Forest area as a % of total land area, {{year}}',
  },
  primaryForest: {
    title: 'Primary forest % of forest area, {{year}}',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) %, {{year}}',
    public: 'Public',
    private: 'Private',
  },
  forestAreaWithinProtectedAreas: {
    title: 'Forest area within protected areas {{year}} (% of forest area)',
  },
  primaryDesignatedManagementObjective: {
    title:
      '$t(designatedManagementObjective.primaryDesignatedManagementObjective) ({{startYear}} - {{endYear}}), $t({{unit}})',
    rowName: '',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(common.other)',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    social_services: '$t(designatedManagementObjective.socialServices)',
  },
  naturallyRegeneratingForest: {
    title: 'Naturally regenerated and planted forest area ({{startYear}} - {{endYear}}), $t({{unit}})',
  },
}
