module.exports = {
  rowName: {
    forest_area: 'Площадь лесов',
    natural_forest_area: 'Естественно возобновляемые леса',
    planted_forest: '$t(forestCharacteristics.plantedForest)',
    forest_area_within_protected_areas: '$t(forestAreaWithinProtectedAreas.header)',
    land_area: 'Площадь земель',
    primary_forest: '$t(specificForestCategories.primaryForest)',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_area: ' Прочие площади',
    other_forest: 'Прочие леса',
    other_or_unknown: 'Другое или неизвестно',
  },
  forestArea: {
    title: 'Площадь лесов (1990 — 2020)',
  },
  carbonAndGrowingStock: {
    title: 'Запасы древостоя и углерода в лесах (1990 — 2020)',
    rowName: '',
    carbon_stock_biomass_total: 'Запас углерода в биомассе',
    carbon_stock_total: 'Общий запас углерода',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: 'Площадь лесов % от площади суши (2020)',
  },
  primaryForest: {
    title: 'Девственные леса % от площади лесов (2020)',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) (2015)',
    public: 'Государственная',
    private: 'Частная',
  },
  forestAreaWithinProtectedAreas: {
    title: '$t(forestAreaWithinProtectedAreas.header) (1990 — 2020)',
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
    title: 'Площадь естественно возобновляемых лесов (1990 — 2020)',
  },
}
