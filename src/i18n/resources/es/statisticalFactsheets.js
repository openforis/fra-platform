module.exports = {
  noData: 'No hay datos disponibles',
  rowName: {
    forestArea: 'Área forestal',
    naturalForestArea: 'Bosque regenerado de forma natural',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'Superficie de la terra',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    otherArea: 'Otras tierras',
    otherForest: 'Otros bosques',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other: '$t(common.other)',
    unknown: '$t(fra.forestOwnership.unknown2025)',
    other_or_unknown: 'Desconocidas/otras',
  },
  forestArea: {
    title: 'Área forestal ({{startYear}} - {{endYear}})',
  },
  carbonAndGrowingStock: {
    title: 'Existencias en formación y carbono en los bosques ({{startYear}} - {{endYear}})',
    rowName: '',
    carbon_stock_biomass_total: 'Carbono en la biomasa',
    carbon_stock_total: 'Total de carbono',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: 'Superficie forestal % de la superficie total ({{year}})',
  },
  primaryForest: {
    title: 'Bosque primario % de area forestal ({{year}})',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) ({{year}})',
    public: 'Pública',
    private: 'Privada',
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
    title: 'Área de bosque con procesos de regeneración natural y bosque plantado ({{startYear}} - {{endYear}})',
  },
}
