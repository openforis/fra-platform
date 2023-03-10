module.exports = {
  '//': 'المفاتيح هي بنفس صيغة حقول قاعدة البيانات ',
  extent: {
    bamboo: '$t(specificForestCategories.bamboo)',
    mangroves: '$t(specificForestCategories.mangroves)',
    title: 'مَدًى',
    forest_area: 'الغابة (١٠٠٠  هكتار)',
    other_wooded_land: 'أراضي حرجية أخرى (١٠٠٠  هكتار)',
    primary_forest_percent: 'غابة أولية (٪ من الغابات)',
    protected_forest_percent: 'الغابات في المناطق المحمية (٪ من الغابات)',
    management_plan_percent: 'مساحة الغابات مع خطط الإدارة (٪ من الغابات)',
    certified_area: 'مساحة الغابات المعتمدة (١٠٠٠  هكتار)',
  },

  periodicChangeRate: {
    title: 'معدلات التغيير الدوري (المعدلات السنوية)',
    forest_area_annual_net_change: 'صافي التغير السنوي لمساحة الغابات (١٠٠٠  هكتار)',
    forest_area_annual_net_change_rate: 'معدل التغير الصافي السنوي لمساحة الغابات (٪)',
    other_wooded_land_annual_net_change: 'صافي التغير السنوي لمساحة الأراضي الحرجية الأخرى (١٠٠٠ هكتار)',
    other_wooded_land_annual_net_change_rate: 'معدل التغير الصافي السنوي لمنطقة الأراضي الحرجية الأخرى (٪)',
    primary_forest_annual_net_change: 'صافي التغير السنوي للغابات الأولية (١٠٠٠  هكتار)',
    primary_forest_annual_net_change_rate: 'معدل التغير في مساحة الغابات الأولية (٪)',
    natural_forest_area_annual_net_change: 'التجديد الصافي السنوي لالغابات المجددة طبيعياً',
    natural_forest_area_annual_net_change_rate: 'معدل التغير لالغابات المجددة طبيعياً (٪)',
    planted_forest_annual_net_change: 'صافي التغير السنوي للغابات المزروعة',
    planted_forest_annual_net_change_rate: 'معدل تغير الغابات المزروعة (٪)',
  },

  forestGrowingStockBiomassCarbon: {
    title: 'مخزون الغابات المتزايد والكتلة الحيوية والكربون',
    forest: 'مخزون الأشجار الحيّة (متر مكعب / هكتار)',
    forest_above_ground: 'الكتلة الحيوية فوق الأرض (طن / هكتار)',
    forest_below_ground: 'الكتلة الحيوية تحت الأرض (طن / هكتار)',
    forest_deadwood: 'الحطب الميّت (طن / هكتار)',
    carbon_forest_above_ground: 'الكربون في الكتلة الحيوية فوق الأرض (طن / هكتار)',
    carbon_forest_below_ground: 'الكربون في الكتلة الحيوية تحت الأرض (طن / هكتار)',
    carbon_forest_deadwood: 'الكربون في الخشب الميت (طن / هكتار)',
    carbon_forest_litter: 'الكربون في فضلات النبات (طن / هكتار)',
    carbon_forest_soil: 'الكربون في التربة (طن / هكتار)',
    above_ground_biomass_growing_stock_ratio: 'نسبة (الكتلة الحيوية فوق الأرض) / مخزون النمو (طن / متر مكعب)',
    root_shoot_ratio: 'معدل وزن الجزء الجذري إلى الجزء الخضري',
    carbon_biomass_deadwood_ratio: 'النسبة (الحطب الميّت / الكتلة الحيوية الحية)',
    carbon_biomass_above_ground_ratio: 'النسبة (الكربون / الكتلة الحيوية) للكتلة الحيوية فوق الأرض',
    carbon_biomass_below_ground_ratio: 'النسبة (الكربون / الكتلة الحيوية) للكتلة الحيوية تحت الأرض',
    dead_living_mass_ratio: 'نسبة (الكربون / الكتلة الحيوية) الحطب الميّت',
  },

  primaryDesignatedManagementObjective: {
    title: 'الهدف الأساسي للإدارة المعينة',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    social_services: '$t(designatedManagementObjective.socialServices)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(designatedManagementObjective.other)',
    no_unknown: '$t(designatedManagementObjective.unknown)',
  },

  totalAreaDesignatedManagementObjective: 'إجمالي المساحة بهدف إداري محدد',

  forestOwnership: {
    title: 'الملكية',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_or_unknown: '$t(forestOwnership.otherOrUnknown)',
  },

  holderOfManagementRights: {
    title: 'حقوق إدارة الغابات العامة',
    public_administration: '$t(holderOfManagementRights.publicAdministration)',
    individuals: '$t(holderOfManagementRights.individuals)',
    private_businesses: '$t(holderOfManagementRights.privateBusinesses)',
    communities: '$t(holderOfManagementRights.communities)',
    other: '$t(holderOfManagementRights.other)',
  },

  disturbances: {
    title: 'الاضطرابات',
    insects: '$t(disturbances.insects)',
    diseases: '$t(disturbances.diseases)',
    severe_weather_events: '$t(disturbances.severeWeatherEvents)',
    other: '$t(disturbances.other)',
  },
}
