module.exports = {
  noData: 'Aucune donnée disponible',
  rowName: {
    area: 'Superficie',
    forest: 'Forêt',
    landArea: 'Superficie des terres',
    naturalForestArea: '$t(forestCharacteristics.naturalForestArea)',
    other: '$t(common.other)',
    otherArea: 'Autre superficie',
    otherForest: 'Autre forêt',
    otherLand: '$t(fraClass.otherLand)',
    other_or_unknown: 'Autre ou inconnu',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    private_ownership: 'Privée',
    protected: 'Protégée',
    public_ownership: 'Publique',
    unknown: '$t(fra.forestOwnership.unknown2025)',
  },
  forestArea: {
    title: 'Superficie forestière, {{startYear}} - {{endYear}}, $t({{unit}})',
  },
  carbonAndGrowingStock: {
    title: 'Volume de bois sur pied et Carbone dans les forêts, {{startYear}} - {{endYear}}',
    rowName: '',
    carbon_stock_biomass_total: 'Stock de carbone dans la biomasse ($t({{unit}}))',
    carbon_stock_total: 'Stock de carbone total ($t({{unit}}))',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: 'Superficie de forêt en % de la superficie totale des terres, {{year}}',
  },
  primaryForest: {
    title: 'Forêt primaire en % de la superficie forestière, {{year}}',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) %, {{year}}',
  },
  forestAreaWithinProtectedAreas: {
    title: '$t(forestAreaWithinProtectedAreas.header), {{year}}',
  },
  primaryDesignatedManagementObjective: {
    title:
      '$t(designatedManagementObjective.primaryDesignatedManagementObjective), {{startYear}} - {{endYear}}, $t({{unit}})',
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
    title: 'Superficie de forêt naturellement régénérée et plantée, {{startYear}} - {{endYear}}, $t({{unit}})',
  },
}
