module.exports = {
  '//': 'المفاتيح هي بنفس صيغة حقول قاعدة البيانات ',
  extent: {
    title: 'النطاق',
    forest_area: 'مساحة الغابة (1000 هـ)',
    other_wooded_land: 'أرض حرجية أخرى (1000 هـ)',
    primary_forest_percent: 'غابة بكر (% من الغابات)',
    protected_forest_percent: 'غابة في مناطق محمية (% غابة محمية)',
    management_plan_percent: 'مساحة الغابة التي أعد مخطط لإدارتها (% الغابة)',
    certified_area: 'مساحة الغابة المصدقة (1000 هـ)',
    bamboo: '$t(specificForestCategories.bamboo)',
    mangroves: '$t(specificForestCategories.mangroves)',
  },

  periodicChangeRate: {
    title: 'نسب التغير الدورية (نسب سنوية)',
    forest_area_annual_net_change: 'صافي التغير السنوي في مساحة الغابات (1000 هكتار)',
    forest_area_annual_net_change_rate: 'نسبة صافي التغير السنوي في مساحة الغابات (%)',
    other_wooded_land_annual_net_change: 'صافي التغير السنوي في مساحة الأراضي الحرجية الأخرى (1000 هـ)',
    other_wooded_land_annual_net_change_rate: 'نسبة صافي التغير السنوي في مساحة الأراضي الحرجية الأخرى (%)',
    primary_forest_annual_net_change: 'صافي التغير السنوي في مساحة الغابات البكر (1000 هـ)',
    primary_forest_annual_net_change_rate: 'نسبة صافي التغير في مساحة الغابات البكر (%)',
    natural_forest_area_annual_net_change: 'صافي التغير السنوي في الغابات المتجددة طبيعياً',
    natural_forest_area_annual_net_change_rate: '(%) نسبة التغير في الغابات المتجددة طبيعياً',
    planted_forest_annual_net_change: 'صافي التغير السنوي في الغابات المزروعة',
    planted_forest_annual_net_change_rate: '(%) نسبة التغير في الغابات المزروعة',
  },

  forestGrowingStockBiomassCarbon: {
    title: 'المخزون والكتلة الحيوية والكربون المستمد من الأشجار الحية في الغابات',
    forest: 'مخزون الأشجار الحية (م3/هـ)',
    forest_above_ground: 'الكتلة الحيوية فوق الأرض (طن/هـ)',
    forest_below_ground: 'الكتلة الحيوية تحت الأرض (طن/هـ)',
    forest_deadwood: 'خشب ميت (طن/هـ)',
    carbon_forest_above_ground: 'الكربون في الكتلة الحيوية فوق الأرض (طن/هـ)',
    carbon_forest_below_ground: 'الكربون في الكتلة الحيوية تحت الأرض (طن/هـ)',
    carbon_forest_deadwood: 'الكربون في الخشب الميت (طن/هـ)',
    carbon_forest_litter: 'الكربون في المخلفات (طن/هـ)',
    carbon_forest_soil: 'الكربون في التربة (طن/هـ)',
    above_ground_biomass_growing_stock_ratio: 'نسبة (الكتلة الحيوية فوق الأرض)/مخزون الأشجار الحية (طن/م3)',
    root_shoot_ratio: 'Root-Shoot ratio',
    carbon_biomass_deadwood_ratio: 'نسبة (الخشب الميت/الكتلة الحيوية الحية)',
    carbon_biomass_above_ground_ratio: 'نسبة (الكربون/الكتلة الحيوية) للكتلة الحيوية فوق الأرض',
    carbon_biomass_below_ground_ratio: 'نسبة (الكربون/الكتلة الحيوية) للكتلة الحيوية تحت الأرض',
    dead_living_mass_ratio: 'نسبة (الكربون/الكتلة الحيوية) للخشب الميت',
  },

  primaryDesignatedManagementObjective: {
    title: 'الهدف الرئيس المحدد للإدارة',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    social_services: '$t(designatedManagementObjective.socialServices)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(designatedManagementObjective.other)',
    no_unknown: '$t(designatedManagementObjective.unknown)',
  },

  totalAreaDesignatedManagementObjective: 'إجمالي المساحة الخاضعة لهدف إدارة محدد',

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
    title: 'اضطرابات',
    insects: '$t(disturbances.insects)',
    diseases: '$t(disturbances.diseases)',
    severe_weather_events: '$t(disturbances.severeWeatherEvents)',
    other: '$t(disturbances.other)',
  },
}
