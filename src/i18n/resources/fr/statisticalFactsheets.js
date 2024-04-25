module.exports = {
  noData: 'Aucune donnée',

  rowName: {
    forestArea: 'Superficie forestière',
    naturalForestArea: 'Forêt naturellement régénérée',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: 'Superficie forestière à l’intérieur des aires protégées',
    landArea: 'Superficie des terres',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    otherArea: 'Autre superficie',
    otherForest: 'Autre forêt',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other: '$t(common.other)',
    unknown: '$t(fra.forestOwnership.unknown2025)',
    other_or_unknown: 'Autre ou inconnu',
  },
  forestArea: {
    title: 'Superficie forestière ({{startYear}} - {{endYear}})',
  },
  carbonAndGrowingStock: {
    title: 'Volume de bois sur pied et Carbone dans les forêts ({{startYear}} - {{endYear}})',
    rowName: '',
    carbon_stock_biomass_total: 'Stock de carbone dans la biomasse',
    carbon_stock_total: 'Stock de carbone total',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: 'Superficie de forêt en % de la superficie des terres ({{year}})',
  },
  primaryForest: {
    title: 'Forêt primaire en % de la superficie forestière ({{year}})',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) ({{year}})',
    public: 'Publique',
    private: 'Privée',
  },
  forestAreaWithinProtectedAreas: {
    title: '$t(forestAreaWithinProtectedAreas.header) ({{year}})',
  },
  primaryDesignatedManagementObjective: {
    title: '$t(designatedManagementObjective.primaryDesignatedManagementObjective) ({{startYear}} - {{endYear}})',
    rowName: '',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(common.other)',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    social_services: '$t(designatedManagementObjective.socialServices)',
  },
  naturallyRegeneratingForest: {
    title: 'Superficie de forêt naturellement régénérée ({{startYear}} - {{endYear}})',
  },
}
