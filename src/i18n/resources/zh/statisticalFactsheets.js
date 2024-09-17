module.exports = {
  noData: '暂无数据',
  rowName: {
    area: '面积',
    forest: '森林',
    landArea: '土地面积',
    naturalForestArea: '$t(forestCharacteristics.naturalForestArea)',
    other: '$t(common.other)',
    otherArea: '其他面积',
    otherForest: '其他森林',
    other_or_unknown: '其他或未知',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    private_ownership: '私有',
    protected: '受保护',
    public_ownership: '公有',
    unknown: '$t(fra.forestOwnership.unknown2025)',
  },
  forestArea: {
    title: '森林面积, {{startYear}} - {{endYear}}',
  },
  carbonAndGrowingStock: {
    title: '森林立木蓄积量和碳储量, {{startYear}} - {{endYear}}',
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
  },
  forestAreaWithinProtectedAreas: {
    title: '{{year}}保护区内森林面积 (占森林面积百分比)',
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
    unknown: '$t(fra.designatedManagementObjective.unknown2025)',
    no_designation: '$t(fra.designatedManagementObjective.noDesignation)',
  },
  naturallyRegeneratingForest: {
    title: '自然再生林和人工林面积, {{startYear}} - {{endYear}}, $t({{unit}})',
  },
}
