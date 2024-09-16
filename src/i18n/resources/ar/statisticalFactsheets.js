module.exports = {
  noData: 'لا توجد بيانات متاحة',
  rowName: {
    area: 'المساحة',
    forest: 'الغابة',
    forestArea: 'مساحة الغابة',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: 'مساحة الأرض',
    naturalForestArea: '$t(forestCharacteristics.naturalForestArea)',
    other: '$t(common.other)',
    otherArea: 'منطقة أخرى',
    otherForest: 'غابة أخرى',
    other_or_unknown: 'أخرى أو مجهولة',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    private_ownership: 'الخاصة',
    protected: 'المحمية',
    public_ownership: 'العامة',
    unknown: '$t(fra.forestOwnership.unknown2025)',
  },
  forestArea: {
    title: 'مساحة الغابات ,{{startYear}} - {{endYear}}, $t({{unit}})',
  },
  carbonAndGrowingStock: {
    title: 'مخزون وكربون الأشجار الحية في الغابات ,{{startYear}} - {{endYear}}',
    rowName: '',
    carbon_stock_biomass_total: 'مخزون الكربون في الكتلة الحيوية($t({{unit}}))',
    carbon_stock_total: 'إجمالي مخزون الكربون($t({{unit}})) ',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: 'مساحة الغابات كنسبة مئوية من إجمالي مساحة الأراضي، {{year}}',
  },
  primaryForest: {
    title: 'النسبة المئوية للغابة البكر إلى مساحة الغابات , {{year}} ',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) %, {{year}}',
    public: 'عامة',
    private: 'خاصة',
  },
  forestAreaWithinProtectedAreas: {
    title: 'مساحة الغابة ضمن المناطق المحمية {{year}} (% من مساحة الغابة)',
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
    title: 'مساحة الغابات المتجددة طبيعياً والمزروعة ,{{startYear}} - {{endYear}}, $t({{unit}})',
  },
}
