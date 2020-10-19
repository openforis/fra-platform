module.exports = {
  '//': 'Keys are in same format as the database fields',
  extent: {
    title: 'Extent',
    forest_area: 'Forest (1000 ha)',
    other_wooded_land: 'Other wooded land (1000 ha)',
    primary_forest_percent: 'Primary forest (% of forest)',
    protected_forest_percent: 'Forest in protected areas (% of forest)',
    management_plan_percent: 'Forest area with mgmt plan (% of forest)',
    certified_area: 'Certified forest area (1000 ha)',
    bamboo: '$t(specificForestCategories.bamboo)',
    mangroves: '$t(specificForestCategories.mangroves)',
  },

  periodicChangeRate: {
    title: 'Periodic change rates (annual rates)',
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
  },

  forestGrowingStockBiomassCarbon: {
    title: 'FOREST growing stock, biomass and carbon',
    forest: 'GS (m3/ha)',
    forest_above_ground: 'Above-ground biomass (t/ha)',
    forest_below_ground: 'Below-ground biomass (t/ha)',
    forest_deadwood: 'Dead wood (t/ha)',
    carbon_forest_above_ground: 'C in above-ground biomass (t/ha)',
    carbon_forest_below_ground: 'C in below-ground biomass (t/ha)',
    carbon_forest_deadwood: 'C in dead wood (t/ha)',
    carbon_forest_litter: 'C in litter (t/ha)',
    carbon_forest_soil: 'C in soil (t/ha)',
    above_ground_biomass_growing_stock_ratio: 'Ratio (above-ground biomass) / GS (t/m3)',
    root_shoot_ratio: 'Root-Shoot ratio',
    carbon_biomass_deadwood_ratio: 'Ratio (Dead wood / Living biomass)',
    carbon_biomass_above_ground_ratio: 'Ratio (Carbon/biomass) for above-ground biomass',
    carbon_biomass_below_ground_ratio: 'Ratio (Carbon/biomass) for below-ground biomass',
    dead_living_mass_ratio: 'Ratio (Carbon/biomass) for dead wood',
  },

  primaryDesignatedManagementObjective: {
    title: 'Primary designated management objective',
    production: '$t(designatedManagementObjective.production)',
    protection_of_soil_and_water: '$t(designatedManagementObjective.soilWaterProtection)',
    conservation_of_biodiversity: '$t(designatedManagementObjective.biodiversityConservation)',
    social_services: '$t(designatedManagementObjective.socialServices)',
    multiple_use: '$t(designatedManagementObjective.multipleUse)',
    other: '$t(designatedManagementObjective.other)',
    no_unknown: '$t(designatedManagementObjective.unknown)',
  },

  totalAreaDesignatedManagementObjective: 'Total area with designated management objective',

  forestOwnership: {
    title: 'Ownership',
    private_ownership: '$t(forestOwnership.privateOwnership)',
    public_ownership: '$t(forestOwnership.publicOwnership)',
    other_or_unknown: '$t(forestOwnership.otherOrUnknown)',
  },

  holderOfManagementRights: {
    title: 'Management rights of public forests',
    public_administration: '$t(holderOfManagementRights.publicAdministration)',
    individuals: '$t(holderOfManagementRights.individuals)',
    private_businesses: '$t(holderOfManagementRights.privateBusinesses)',
    communities: '$t(holderOfManagementRights.communities)',
    other: '$t(holderOfManagementRights.other)',
  },

  disturbances: {
    title: 'Disturbances',
    insects: '$t(disturbances.insects)',
    diseases: '$t(disturbances.diseases)',
    severe_weather_events: '$t(disturbances.severeWeatherEvents)',
    other: '$t(disturbances.other)',
  },
}
