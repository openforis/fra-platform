module.exports = {
  noData: '无数据',
  rowName: {
    forest_area: '森林面积',
    natural_forest_area: '天然林',
    planted_forest: '$t(forestCharacteristics.plantedForest)',
    forest_area_within_protected_areas: '$t(forestAreaWithinProtectedAreas.header)',
    land_area: '土地面积',
    primary_forest: '$t(specificForestCategories.primaryForest)',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_area: '其他面积',
    other_forest: '其他森林',
    other_or_unknown: '其他或未知',
  },
  forestArea: {
    title: '森林面积 (1990 — 2020)',
  },
  carbonAndGrowingStock: {
    title: '森林立木蓄积量和碳储量 (1990 — 2020)',
    rowName: '',
    carbon_stock_biomass_total: '生物质碳储量',
    carbon_stock_total: '碳储量合计',
    growing_stock_total: '$t(growingStock.growingStock)',
  },
  forestAreaPercent: {
    title: '森林占陆地面积百分比 (2020)',
  },
  primaryForest: {
    title: '原始林占森林面积百分比 (2020)',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) (2015)',
    public: '公有',
    private: '私有',
  },
  forestAreaWithinProtectedAreas: {
    title: '2020保护区内森林面积 (占森林面积百分比)',
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
    title: '天然再生林面积 (1990 — 2020)',
  },
}
