module.exports = {
  noData: 'لا توجد بيانات متاحة',
  rowName: {
    forestArea: 'مساحة الغابة',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'مساحة الأرض',
    naturalForestArea: 'غابة متجددة طبيعياً',
    other: '$t(common.other)',
    otherArea: 'منطقة أخرى',
    otherForest: 'غابة أخرى',
    other_or_unknown: 'أخرى أو مجهولة',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    unknown: '$t(fra.forestOwnership.unknown2025)',
  },
  forestArea: {
    title: 'مساحة الغابات ({{startYear}} - {{endYear}})',
  },
  carbonAndGrowingStock: {
    title: 'مخزون وكربون الأشجار الحية في الغابات ({{startYear}} - {{endYear}})',
    rowName: '',
    carbon_stock_biomass_total: 'مخزون الكربون في الكتلة الحيوية($t({{unit}}))',
    carbon_stock_total: 'إجمالي مخزون الكربون($t({{unit}})) ',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: 'النسبة المئوية لمساحة الغابة إلى إجمالي مساحة الأرض ({{year}})',
  },
  primaryForest: {
    title: 'النسبة المئوية للغابة البكر إلى مساحة الغابات ({{year}}) ',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) ({{year}})',
    public: 'عامة',
    private: 'خاصة',
  },
  forestAreaWithinProtectedAreas: {
    title: 'مساحة الغابة ضمن المناطق المحمية {{year}} (% من مساحة الغابة)',
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
    title: 'مساحة الغابات المتجددة طبيعياً والمزروعة ({{startYear}} - {{endYear}})',
  },
}
