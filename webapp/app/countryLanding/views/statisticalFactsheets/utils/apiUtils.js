const baseUrl = '/api/statisticalFactsheets/'
export const getUrl = () => `${baseUrl}`

const sections = {
  forestArea: ['forest_area'],
  carbonAndGrowingStock: ['growing_stock_total', 'carbon_stock_biomass_total', 'carbon_stock_total'],
  forestAreaPercent: ['forest_area', 'land_area'],
  primaryForest: ['primary_forest_ratio'],
  forestOwnership: ['private_ownership', 'public_ownership', 'other_or_unknown'],
  forestAreaWithinProtectedAreas: ['forest_area', 'forest_area_within_protected_areas'],
  primaryDesignatedManagementObjective: [
    'production',
    'multiple_use',
    'conservation_of_biodiversity',
    'protection_of_soil_and_water',
    'social_services',
    'other',
  ],
  naturallyRegeneratingForest: ['natural_forest_area', 'planted_forest'],
}
const getRowNames = (section) => ({ rowNames: sections[section] })
const getLevel = (level) => ({ level })

export const getParams = (section, level) => {
  return sections[section] ? { ...getRowNames(section), ...getLevel(level) } : []
}
