module.exports = {
  noData: 'Aucune donnée',

  rowName: {
    forest_area: 'Superficie forestière',
    natural_forest_area: 'Forêt naturellement régénérée',
    planted_forest: '$t(forestCharacteristics.plantedForest)',
    forest_area_within_protected_areas: '$t(forestAreaWithinProtectedAreas.header)',
    land_area: 'Superficie des terres',
    primary_forest: '$t(specificForestCategories.primaryForest)',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_area: 'Autre superficie',
    other_forest: 'Autre forêt',
    other_or_unknown: 'Autre ou inconnu',
  },
  forestArea: {
    title: 'Superficie forestière (1990 — 2020)',
  },
  carbonAndGrowingStock: {
    title: 'Volume de bois sur pied et Carbone dans les forêts (1990 — 2020)',
    rowName: '',
    carbon_stock_biomass_total: 'Stock de carbone dans la biomasse',
    carbon_stock_total: 'Stock de carbone total',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: 'Superficie de forêt en % de la superficie des terres (2020)',
  },
  primaryForest: {
    title: 'Forêt primaire en % de la superficie forestière (2020)',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) (2015)',
    public: 'Publique',
    private: 'Privée',
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
    title: 'Superficie de forêt naturellement régénérée (1990 — 2020)',
  },
}
