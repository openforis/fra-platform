module.exports = {
  noData: 'No hay datos disponibles',
  rowName: {
    area: 'Área',
    forest: 'Bosque',
    forestArea: 'Área forestal',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'Superficie de la terra',
    naturalForestArea: '$t(forestCharacteristics.naturalForestArea)',
    other: '$t(common.other)',
    otherArea: 'Otras tierras',
    otherForest: 'Otros bosques',
    other_or_unknown: 'Desconocidas/otras',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    private_ownership: 'Privado',
    protected: 'Protegida',
    public_ownership: 'Público',
    unknown: '$t(fra.forestOwnership.unknown2025)',
  },
  forestArea: {
    title: 'Área forestal, {{startYear}} - {{endYear}}, $t({{unit}})s',
  },
  carbonAndGrowingStock: {
    title: 'Existencias en formación y carbono en los bosques, {{startYear}} - {{endYear}}',
    rowName: '',
    carbon_stock_biomass_total: 'Carbono en la biomasa ($t({{unit}}))',
    carbon_stock_total: 'Total de carbono ($t({{unit}}))',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: 'Área de bosque en % de la superficie terrestre total, {{year}}',
  },
  primaryForest: {
    title: 'Bosque primario % de area forestal, {{year}}',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) %, {{year}}',
    public: 'Pública',
    private: 'Privada',
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
  },
  naturallyRegeneratingForest: {
    title:
      'Área de bosque con procesos de regeneración natural y bosque plantado, {{startYear}} - {{endYear}}, $t({{unit}})',
  },
}
