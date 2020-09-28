module.exports = {
  tableName: 'content_check_forest_growing_stock_biomass_carbon',
  rows: {
    names: [
      'forest',
      'forest_above_ground',
      'forest_below_ground',
      'forest_deadwood',
      'carbon_forest_above_ground',
      'carbon_forest_below_ground',
      'carbon_forest_deadwood',
      'carbon_forest_litter',
      'carbon_forest_soil',
      'above_ground_biomass_growing_stock_ratio',
      'root_shoot_ratio',
      'carbon_biomass_deadwood_ratio',
      'carbon_biomass_above_ground_ratio',
      'carbon_biomass_below_ground_ratio',
      'dead_living_mass_ratio',
    ],
  },
  columns: [
    { name: '1990', type: 'numeric' },
    { name: '2000', type: 'numeric' },
    { name: '2010', type: 'numeric' },
    { name: '2015', type: 'numeric' },
    { name: '2016', type: 'numeric' },
    { name: '2017', type: 'numeric' },
    { name: '2018', type: 'numeric' },
    { name: '2019', type: 'numeric' },
    { name: '2020', type: 'numeric' },
  ],
}
