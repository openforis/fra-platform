module.exports = {
  noData: 'Ningún dato',
  rowName: {
    forestArea: 'Área forestal',
    naturalForestArea: 'Bosque regenerado de forma natural',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'Superficie de la terra',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    privateOwnership: '$t(forestOwnership.privateOwnership)',
    publicOwnership: '$t(forestOwnership.publicOwnership)',
    otherArea: 'Otras tierras',
    otherForest: 'Otros bosques',
    otherOrUnknown: 'Desconocidas/otras',
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
    title: 'Área de bosque con procesos de regeneración natural y bosque plantado (1990 — 2020)',
  },
}
