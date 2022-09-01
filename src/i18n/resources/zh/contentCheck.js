module.exports = {
  '//': 'Keys are in same format as the database fields',
  extent: {
    title: '面积',
    forest_area: '森林 (1000 公顷)',
    other_wooded_land: '其他林地 (1000 公顷)',
    primary_forest_percent: '原始林 (占森林百分比)',
    protected_forest_percent: '保护区内森林 (占森林百分比)',
    management_plan_percent: '纳入管理计划的森林面积 (占森林百分比)',
    certified_area: '认证林面积 (1000 公顷)',
    bamboo: '$t(specificForestCategories.bamboo)',
    mangroves: '$t(specificForestCategories.mangroves)',
  },

  periodicChangeRate: {
    title: '一定时期内的变化率 (年度变化率)',
    forest_area_annual_net_change: '森林面积年度净变化(1000 公顷)',
    forest_area_annual_net_change_rate: '森林面积年度净变化率 (%)',
    other_wooded_land_annual_net_change: '其他林地面积年度净变化 (1000 公顷)',
    other_wooded_land_annual_net_change_rate: '其他林地面积年度净变化率(%)',
    primary_forest_annual_net_change: '原始林面积年度净变化 (1000 公顷)',
    primary_forest_annual_net_change_rate: '原始林面积年度净变化率 (%)',
    natural_forest_area_annual_net_change: '天然林面积年度净变化',
    natural_forest_area_annual_net_change_rate: '天然林面积年度净变化率 (%)',
    planted_forest_annual_net_change: '人工林面积年度净变化',
    planted_forest_annual_net_change_rate: '人工林面积年度净变化率 (%)',
  },

  forestGrowingStockBiomassCarbon: {
    title: '森林立木蓄积量、生物量和碳储量',
    forest: '蓄积量 (立方米/公顷)',
    forest_above_ground: '地上生物量 (吨/公顷)',
    forest_below_ground: '地下生物量 (吨/公顷)',
    forest_deadwood: '枯死木 (吨/公顷)',
    carbon_forest_above_ground: '地上生物质碳储量 (吨/公顷)',
    carbon_forest_below_ground: '地下生物质碳储量 (吨/公顷)',
    carbon_forest_deadwood: '枯死木碳储量 (吨/公顷)',
    carbon_forest_litter: '林分枯落物碳储量 (吨/公顷)',
    carbon_forest_soil: '土壤碳储量 (吨/公顷)',
    above_ground_biomass_growing_stock_ratio: '比率 (地上生物量) / 立木蓄积量 (吨/立方米)',
    root_shoot_ratio: '根冠比',
    carbon_biomass_deadwood_ratio: '比率 (枯死木 / 活生物量)',
    carbon_biomass_above_ground_ratio: '比率 (碳储量/生物量) -地上生物质',
    carbon_biomass_below_ground_ratio: '比率 (碳储量/生物量) -地下生物质',
    dead_living_mass_ratio: '比率 (碳储量/生物量) -枯死木',
  },

  primaryDesignatedManagementObjective: {
    title: '主要指定管理目标',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    social_services: '$t(designatedManagementObjective.socialServices)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(designatedManagementObjective.other)',
    no_unknown: '$t(designatedManagementObjective.unknown)',
  },

  totalAreaDesignatedManagementObjective: '指定管理目标所涉地区总面积',

  forestOwnership: {
    title: '权属',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_or_unknown: '$t(forestOwnership.otherOrUnknown)',
  },

  holderOfManagementRights: {
    title: '国有林管理权',
    public_administration: '$t(holderOfManagementRights.publicAdministration)',
    individuals: '$t(holderOfManagementRights.individuals)',
    private_businesses: '$t(holderOfManagementRights.privateBusinesses)',
    communities: '$t(holderOfManagementRights.communities)',
    other: '$t(holderOfManagementRights.other)',
  },

  disturbances: {
    title: '遭到的干扰',
    insects: '$t(disturbances.insects)',
    diseases: '$t(disturbances.diseases)',
    severe_weather_events: '$t(disturbances.severeWeatherEvents)',
    other: '$t(disturbances.other)',
  },
}
