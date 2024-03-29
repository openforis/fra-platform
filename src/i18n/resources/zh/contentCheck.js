module.exports = {
  '//': 'Keys are in same format as the database fields',
  extent: {
    bamboo: '$t(specificForestCategories.bamboo)',
    mangroves: '$t(specificForestCategories.mangroves)',
    title: '范围',
    forest_area: '森林(1000公顷)',
    other_wooded_land: '其它林地(1000公顷)',
    primary_forest_percent: '原生林(占森林的百分比)',
    protected_forest_percent: '保护区内的森林(占森林的百分比)',
    management_plan_percent: '有管理计划的森林面积(占森林的百分比)',
    certified_area: '经认证的森林面积(1000公顷)',
  },

  periodicChangeRate: {
    title: '周期性变化率(年率)',
    forest_area_annual_net_change: '森林面积年净变化(1000公顷)',
    forest_area_annual_net_change_rate: '森林面积年净变化率(百分比)',
    other_wooded_land_annual_net_change: '其它林地面积年净变化(1000公顷)',
    other_wooded_land_annual_net_change_rate: '其它林地面积年净变化率(百分比)',
    primary_forest_annual_net_change: '原生林面积年净变化（1000公顷）',
    primary_forest_annual_net_change_rate: '原生林面积变化率(百分比)',
    natural_forest_area_annual_net_change: '自然再生林年度净变化',
    natural_forest_area_annual_net_change_rate: '自然再生林变化率(百分比)',
    planted_forest_annual_net_change: '人工林年净变化',
    planted_forest_annual_net_change_rate: '人工林变化率(百分比)',
  },

  forestGrowingStockBiomassCarbon: {
    title: '森林立木蓄积、生物量和碳储量',
    forest: '立木蓄积量(m3/ha)',
    forest_above_ground: '地上生物量(t/ha)',
    forest_below_ground: '地下生物量(t/ha)',
    forest_deadwood: '枯死木(t/ha)',
    carbon_forest_above_ground: '地上生物量碳(t/ha)',
    carbon_forest_below_ground: '地下生物量碳(t/ha)',
    carbon_forest_deadwood: '枯死木碳(t/ha)',
    carbon_forest_litter: '枯枝落叶碳(t/ha)',
    carbon_forest_soil: '土壤碳(t/ha)',
    above_ground_biomass_growing_stock_ratio: '比率（地上生物量）/ 立木蓄积量 (t/m3)',
    root_shoot_ratio: '根-芽比率',
    carbon_biomass_deadwood_ratio: '比率（枯死木/活体生物量）',
    carbon_biomass_above_ground_ratio: '地上生物量比率（碳/生物量）',
    carbon_biomass_below_ground_ratio: '地下生物量比率（碳/生物量）',
    dead_living_mass_ratio: '枯死木比率（碳/生物量）',
  },

  primaryDesignatedManagementObjective: {
    title: '首要指定管理目标',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    social_services: '$t(designatedManagementObjective.socialServices)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(designatedManagementObjective.other)',
    no_unknown: '$t(designatedManagementObjective.unknown)',
  },

  totalAreaDesignatedManagementObjective: '指定管理目标的总面积',

  forestOwnership: {
    title: '所有权',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_or_unknown: '$t(forestOwnership.otherOrUnknown)',
  },

  holderOfManagementRights: {
    title: '公有森林的管理权',
    public_administration: '$t(holderOfManagementRights.publicAdministration)',
    individuals: '$t(holderOfManagementRights.individuals)',
    private_businesses: '$t(holderOfManagementRights.privateBusinesses)',
    communities: '$t(holderOfManagementRights.communities)',
    other: '$t(holderOfManagementRights.other)',
  },

  disturbances: {
    title: '干扰',
    insects: '$t(disturbances.insects)',
    diseases: '$t(disturbances.diseases)',
    severe_weather_events: '$t(disturbances.severeWeatherEvents)',
    other: '$t(disturbances.other)',
  },
}
