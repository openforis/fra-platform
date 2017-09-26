module.exports = {
  tableName: 'biomass_stock',
  rows: {
    names: [
      'forest', // Won't contain data
      'forest_above_ground_total',
      'forest_below_ground_total',
      'forest_deadwood_total',
      'other_wooded_land', // Won't contain data
      'other_wooded_land_above_ground_total',
      'other_wooded_land_below_ground_total',
      'other_wooded_land_deadwood_total'
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
