export default {
  tableName: 'carbon_stock',
  section: 'carbonStock',
  rows: {
    names: [
      'carbon_forest_above_ground',
      'carbon_forest_below_ground',
      'carbon_forest_deadwood',
      'carbon_forest_litter',
      'carbon_forest_soil',
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
