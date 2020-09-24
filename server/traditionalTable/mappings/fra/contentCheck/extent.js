module.exports = {
  tableName: 'content_check_extent_view',
  rows: {
    names: [
      'forest_area',
      'protected_forest_percent',
      'bamboo',
      'primary_forest_percent',
      'mangroves',
      'other_wooded_land',
      'management_plan_percent',
      'certified_area',
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
