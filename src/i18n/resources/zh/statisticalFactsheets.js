module.exports = {
  noData: '暂无数据',
  rowName: {
    forestArea: '森林面积',
    naturalForestArea: '天然林',
    plantedForest: '$t(forestCharacteristics.plantedForest)',
    forestAreaWithinProtectedAreas: '$t(forestAreaWithinProtectedAreas.header)',
    landArea: '土地面积',
    primaryForest: '$t(specificForestCategories.primaryForest)',
    otherArea: '其他面积',
    otherForest: '其他森林',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
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
    title: '森林占陆地面积百分比 ({{year}})',
  },
  primaryForest: {
    title: '原始林占森林面积百分比 ({{year}})',
  },
  forestOwnership: {
    title: '$t(forestOwnership.forestOwnership) ({{year}})',
    public: '公有',
    private: '私有',
  },
  forestAreaWithinProtectedAreas: {
    title: '{{year}}保护区内森林面积 (占森林面积百分比)',
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
    title: '自然再生林和人工林面积 ({{startYear}} - {{endYear}})',
  },
}
