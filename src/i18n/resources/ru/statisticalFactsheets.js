module.exports = {
  noData: 'Данные отсутствуют',
  rowName: {
    area: 'Площадь',
    forest: 'Площадь лесов',
    landArea: 'Площадь земель',
    naturalForestArea: '$t(forestCharacteristics.naturalForestArea)',
    other: '$t(common.other)',
    otherArea: ' Прочие площади',
    otherForest: 'Прочие леса',
    otherLand: '$t(fraClass.otherLand)',
    other_or_unknown: 'Другое или неизвестно',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    private_ownership: 'Частная собственность',
    protected: 'Охраняемые',
    public_ownership: 'Государственная собственность',
    unknown: '$t(fra.forestOwnership.unknown2025)',
  },
  forestArea: {
    title: 'Площадь лесов, {{startYear}} - {{endYear}}, $t({{unit}})',
  },
  carbonAndGrowingStock: {
    title: 'Запасы древостоя и углерода в лесах, {{startYear}} - {{endYear}}',
    rowName: '',
    carbon_stock_biomass_total: 'Запас углерода в биомассе ($t({{unit}}))',
    carbon_stock_total: 'Общий запас углерода ($t({{unit}}))',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: 'Площадь лесов в % от общей площади земель, {{year}}',
  },
  primaryForest: {
    title: 'Девственные леса % от площади лесов, {{year}}',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) %, {{year}}',
  },
  forestAreaWithinProtectedAreas: {
    title: '$t(forestAreaWithinProtectedAreas.header), {{year}}',
  },
  primaryDesignatedManagementObjective: {
    title:
      '$t(designatedManagementObjective.primaryDesignatedManagementObjective), {{startYear}} - {{endYear}} $t({{unit}})',
    rowName: '',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(common.other)',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    social_services: '$t(designatedManagementObjective.socialServices)',
    unknown: '$t(fra.designatedManagementObjective.unknown2025)',
    no_designation: '$t(fra.designatedManagementObjective.noDesignation)',
  },
  naturallyRegeneratingForest: {
    title: 'Площадь естественно возобновляемых лесов и лесных культур, {{startYear}} - {{endYear}}, $t({{unit}})',
  },
}
