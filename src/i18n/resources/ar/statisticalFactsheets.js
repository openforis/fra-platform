module.exports = {
  noData: 'لاتوجد بيانات',
  rowName: {
    forestArea: 'مساحة الغابة',
    naturalForestArea: 'غابة متجددة طبيعياً',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'مساحة الأرض',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    privateOwnership: '$t(forestOwnership.privateOwnership)',
    publicOwnership: '$t(forestOwnership.publicOwnership)',
    otherArea: 'منطقة أخرى',
    otherForest: 'غابة أخرى',
    otherOrUnknown: 'أخرى أو مجهولة',
  },
  forestArea: {
    title: 'مساحة الغابات (1990-2020)',
  },
  carbonAndGrowingStock: {
    title: 'مخزون وكربون الأشجار الحية في الغابات (1990-2020)',
    rowName: '',
    carbon_stock_biomass_total: 'مخزون الكربون في الكتلة الحيوية',
    carbon_stock_total: 'إجمالي مخزون الكربون',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: 'النسبة المئوية لمساحة الغابة إلى إجمالي مساحة الأرض (2020)',
  },
  primaryForest: {
    title: 'النسبة المئوية للغابة البكر إلى مساحة الغابات (2020) ',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) (2015)',
    public: 'عامة',
    private: 'خاصة',
  },
  forestAreaWithinProtectedAreas: {
    title: 'مساحة الغابة ضمن المناطق المحمية 2020 (% من مساحة الغابة)',
  },
  primaryDesignatedManagementObjective: {
    title: '$t(designatedManagementObjective.primaryDesignatedManagementObjective) (1990-2020)',
    rowName: '',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(common.other)',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    social_services: '$t(designatedManagementObjective.socialServices)',
  },
  naturallyRegeneratingForest: {
    title: 'مساحة الغابات المتجددة طبيعياً والمزروعة (1990-2020)',
  },
}
