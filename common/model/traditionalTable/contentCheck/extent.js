module.exports = {
  tableName: 'content_check_extent_view',
  rows: {
    names: [
      'forest_area',
      'other_wooded_land',

      'primary_forest_percent',
      'protected_forest_percent',
      'management_plan_percent',

      'certified_area',
      'mangroves',
      'bamboo',
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
