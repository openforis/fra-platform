const baseUrl = '/api/statisticalFactsheets/'
export const getUrl = (levelIso) => `${baseUrl}${levelIso}`

const sections = {
  forestArea: ['forest_area'],
  carbonAndGrowingStock: ['carbon_stock_biomass_total', 'carbon_stock_total', 'growing_stock_total'],
  forestAreaPercent: ['forest_area_percent'],
  primaryForest: ['forest_area', 'primary_forest'],
  forestOwnership: ['private_ownership', 'public_ownership', 'other_or_unknown'],
  forestAreaWithinProtectedAreas: ['forest_area_within_protected_areas'],
  primaryDesignatedManagementObjective: [
    'production',
    'multiple_use',
    'conservation',
    'other',
    'protection_of_soil_and_water',
    'social_services',
  ],
  naturallyRegeneratingForest: ['natural_forest_area', 'planted_forest'],
}

export const getParams = (section) => {
  return sections[section] ? { rowNames: sections[section] } : []
}
