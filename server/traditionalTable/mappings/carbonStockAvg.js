module.exports = {
  tableName: 'carbon_stock_avg',
  section: 'carbonStock',
  rows: {
    names: [
      'carbon_forest', // Won't contain data
      'carbon_forest_above_ground_avg',
      'carbon_forest_below_ground_avg',
      'carbon_forest_deadwood_avg',
      'carbon_forest_litter_avg',
      'carbon_forest_soil_avg',
      'carbon_other_wooded_land', // Won't contain data
      'carbon_other_wooded_land_above_ground_avg',
      'carbon_other_wooded_land_below_ground_avg',
      'carbon_other_wooded_land_deadwood_avg',
      'carbon_other_wooded_land_litter_avg',
      'carbon_other_wooded_land_soil_avg'
    ]
  },
  columns: [
    {name: '1990', type: 'numeric'},
    {name: '2000', type: 'numeric'},
    {name: '2010', type: 'numeric'},
    {name: '2015', type: 'numeric'},
    {name: '2016', type: 'numeric'},
    {name: '2017', type: 'numeric'},
    {name: '2018', type: 'numeric'},
    {name: '2019', type: 'numeric'},
    {name: '2020', type: 'numeric'}
  ]
}
