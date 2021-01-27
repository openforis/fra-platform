module.exports = {
  noData: 'Ningún dato',
  rowName: {
    forest_area: 'Área forestal',
    natural_forest_area: 'Bosque regenerado de forma natural',
    planted_forest: '$t(forestCharacteristics.plantedForest)',
    forest_area_within_protected_areas: '$t(forestAreaWithinProtectedAreas.header)',
    land_area: 'Superficie de la terra',
    primary_forest: '$t(specificForestCategories.primaryForest)',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_area: 'Otras tierras',
    other_forest: 'Otros bosques',
    other_or_unknown: 'Desconocidas/otras',
  },
  forestArea: {
    title: 'Área forestal (1990 — 2020)',
  },
  carbonAndGrowingStock: {
    title: 'Existencias en formación y carbono en los bosques (1990 — 2020)',
    rowName: '',
    carbon_stock_biomass_total: 'Carbono en la biomasa',
    carbon_stock_total: 'Total de carbono',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: 'Superficie forestal % de la superficie total (2020)',
  },
  primaryForest: {
    title: 'Bosque primario % de area forestal (2020)',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) (2015)',
    public: 'Pública',
    private: 'Privada',
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
    title: 'Bosque regenerado de forma natural (1990 — 2020)',
  },
}
