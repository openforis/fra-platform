module.exports = {
  '//': 'Keys are in same format as the database fields',
  extent: 'Extent',
  forest_area: 'Forest (1000 ha)',
  other_wooded_land: 'Other wooded land (1000 ha)',
  primary_forest_percent: 'Primary forest (% of forest)',
  protected_forest_percent: 'Forest in protected areas (% of forest)',
  management_plan_percent: 'Forest area with mgmt plan (% of forest)',
  certified_area: 'Certified forest area (1000 ha)',
  bamboo: '$t(specificForestCategories.bamboo)',
  mangroves: '$t(specificForestCategories.mangroves)',

  periodicChangeRate: 'Periodic change rates (annual rates)',
  forest_area_annual_net_change: 'Forest area annual net change (1000 hectares)',
  forest_area_annual_net_change_rate: 'Forest area annual net change rate (%)',
  other_wooded_land_annual_net_change: 'OWL area annual net change (1000 ha)',
  other_wooded_land_annual_net_change_rate: 'OWL area annual net change rate(%)',
  primary_forest_annual_net_change: 'Primary forest annual net change (1000 ha)',
  primary_forest_annual_net_change_rate: 'Primary forest area change rate (%)',
  natural_forest_area_annual_net_change: 'Naturally regenerating forest annual net change',
  natural_forest_area_annual_net_change_rate: 'Naturally regenerating forest change rate (%)',
  planted_forest_annual_net_change: 'Planted forest annual net change',
  planted_forest_annual_net_change_rate: 'Planted forest change rate (%)',

  forestGSBiomassCarbon: 'FOREST growing stock, biomass and carbon',
  gs: 'GS (m3/ha)',
  agb: 'Above-ground biomass (t/ha)',
  bgb: 'Below-ground biomass (t/ha)',
  deadwood: 'Dead wood (t/ha)',
  carbonAgb: 'C in above-ground biomass (t/ha)',
  carbonBgb: 'C in below-ground biomass (t/ha)',
  carbonDeadwood: 'C in dead wood (t/ha)',
  carbonLitter: 'C in litter (t/ha)',
  carbonSoil: 'C in soil (t/ha)',
  ratioAgb: 'Ratio (above-ground biomass) / GS (t/m3)',
  rootShootRatio: 'Root-Shoot ratio',
  ratioDeadwood: 'Ratio (Dead wood / Living biomass)',
  ratioCarbonAgb: 'Ratio (Carbon/biomass) for above-ground biomass',
  ratioCarbonBgb: 'Ratio (Carbon/biomass) for below-ground biomass',
  ratioCarbonDeadwood: 'Ratio (Carbon/biomass) for dead wood',

  primaryDesignatedManagementObjective: 'Primary designated management objective',
  production: '$t(designatedManagementObjective.production)',
  protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
  conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
  social_services: '$t(designatedManagementObjective.socialServices)',
  multiple_use: '$t(designatedManagementObjective.multipleUse)',
  other: '$t(designatedManagementObjective.other)',
  no_unknown: '$t(designatedManagementObjective.unknown)',

  totalAreaDesignatedManagementObjective: 'Total area with designated management objective',

  forestOwnership: 'Ownership',

  managementRightsOfPublicForests: 'Management rights of public forests',

  disturbances: 'Disturbances',
}
