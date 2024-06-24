export type Tables = Record<string, { variables: Array<string>; columns: Array<string> }>
export const tables: Tables = {
  extentOfForest: {
    variables: ['forestArea', 'totalLandArea'],
    columns: ['1990', '2000', '2010', '2020'],
  },

  growingStockTotal: {
    variables: ['growing_stock_total'],
    columns: ['1990', '2000', '2010', '2020'],
  },

  carbonStock: {
    variables: ['carbon_stock_biomass_total', 'carbon_stock_total'],
    columns: ['1990', '2000', '2010', '2020'],
  },

  forestAreaWithinProtectedAreas: {
    variables: ['forest_area_within_protected_areas', 'forestArea'],
    columns: ['2020'],
  },

  forestOwnership: {
    variables: ['other_or_unknown', 'private_ownership', 'public_ownership'],
    columns: ['2015'],
  },

  primaryDesignatedManagementObjective: {
    variables: [
      'production',
      'multiple_use',
      'conservation_of_biodiversity',
      'protection_of_soil_and_water',
      'social_services',
      'other',
    ],
    columns: ['1990', '2000', '2010', '2020'],
  },

  specificForestCategories: {
    variables: ['primary_forest'],
    columns: ['2020'],
  },
}
