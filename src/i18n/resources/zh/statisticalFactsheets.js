module.exports = {
  noData: '暂无数据',
  rowName: {
    area: '面积',
    forest: '森林',
    forestArea: '森林面积',
    naturalForestArea: '$t(forestCharacteristics.naturalForestArea)',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: '土地面积',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    otherArea: '其他面积',
    otherForest: '其他森林',
    private_ownership: '私有',
    public_ownership: '公有',
    other: '$t(common.other)',
    unknown: '$t(fra.forestOwnership.unknown2025)',
    other_or_unknown: '其他或未知',
  },
  forestArea: {
    title: '森林面积 ({{startYear}} - {{endYear}})',
  },
  carbonAndGrowingStock: {
    title: '森林立木蓄积量和碳储量 ({{startYear}} - {{endYear}})',
    rowName: '',
    carbon_stock_biomass_total: '生物质碳储量 ($t({{unit}}))',
    carbon_stock_total: '碳储量合计 ($t({{unit}}))',
    growing_stock_total: '$t(growingStock.growingStock) ($t({{unit}}))',
  },
  forestAreaPercent: {
    title: '{{year}}年森林面积占土地总面积的百分比',
  },
  primaryForest: {
    title: '原始林占森林面积百分比, {{year}}',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) %, {{year}}',
    public: '公有',
    private: '私有',
  },
  forestAreaWithinProtectedAreas: {
    title: '{{year}}保护区内森林面积 (占森林面积百分比)',
  },
  primaryDesignatedManagementObjective: {
    title:
      '$t(designatedManagementObjective.primaryDesignatedManagementObjective) ({{startYear}} - {{endYear}}), $t({{unit}})',
    rowName: '',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(common.other)',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    social_services: '$t(designatedManagementObjective.socialServices)',
  },
  naturallyRegeneratingForest: {
    title: '自然再生林和人工林面积 ({{startYear}} - {{endYear}}), $t({{unit}})',
  },
}
