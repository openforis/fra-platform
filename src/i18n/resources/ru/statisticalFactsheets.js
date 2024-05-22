module.exports = {
  noData: 'Нет данных',
  rowName: {
    forestArea: 'Площадь лесов',
    naturalForestArea: 'Естественно возобновляемые леса',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'Площадь земель',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    privateOwnership: '$t(forestOwnership.privateOwnership)',
    publicOwnership: '$t(forestOwnership.publicOwnership)',
    otherArea: ' Прочие площади',
    otherForest: 'Прочие леса',
    otherOrUnknown: 'Другое или неизвестно',
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
    title: 'Площадь естественно возобновляемых лесов и лесных культур (1990 — 2020)',
  },
}
