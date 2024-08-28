module.exports = {
  noData: 'Данные отсутствуют',
  rowName: {
    forestArea: 'Площадь лесов',
    naturalForestArea: 'Естественно возобновляемые леса',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'Площадь земель',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    otherArea: ' Прочие площади',
    otherForest: 'Прочие леса',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other: '$t(common.other)',
    unknown: '$t(fra.forestOwnership.unknown2025)',
    other_or_unknown: 'Другое или неизвестно',
  },
  forestArea: {
    title: 'Площадь лесов ({{startYear}} - {{endYear}})',
  },
  carbonAndGrowingStock: {
    title: 'Запасы древостоя и углерода в лесах ({{startYear}} - {{endYear}})',
    rowName: '',
    carbon_stock_biomass_total: 'Запас углерода в биомассе ($t({{unit}}))',
    carbon_stock_total: 'Общий запас углерода ($t({{unit}}))',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: 'Площадь лесов % от площади суши ({{year}})',
  },
  primaryForest: {
    title: 'Девственные леса % от площади лесов ({{year}})',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) ({{year}})',
    public: 'Государственная',
    private: 'Частная',
  },
  forestAreaWithinProtectedAreas: {
    title: '$t(forestAreaWithinProtectedAreas.header) ({{year}})',
  },
  primaryDesignatedManagementObjective: {
    title: '$t(designatedManagementObjective.primaryDesignatedManagementObjective) ({{startYear}} - {{endYear}})',
    rowName: '',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation) ($t({{unit}}))',
    multiple_use: '$t(designatedManagementObjective.multipleUse) ($t({{unit}}))',
    other: '$t(common.other) ($t({{unit}}))',
    production: '$t(designatedManagementObjective.production) ($t({{unit}}))',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection) ($t({{unit}}))',
    social_services: '$t(designatedManagementObjective.socialServices) ($t({{unit}}))',
  },
  naturallyRegeneratingForest: {
    title: 'Площадь естественно возобновляемых лесов и лесных культур ({{startYear}} - {{endYear}})',
  },
}
