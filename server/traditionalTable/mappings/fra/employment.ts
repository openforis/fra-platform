module.exports = {
  tableName: 'employment',
  rows: {
    names: [
      'employment_in_forestry_and_logging',
      'of_which_silviculture_and_other_forestry_activities',
      'of_which_logging',
      'of_which_gathering_of_non_wood_forest_products',
      'of_which_support_services_to_forestry',
    ],
  },
  columns: [
    { name: '1990_total', type: 'numeric' },
    { name: '1990_female', type: 'numeric' },
    { name: '1990_male', type: 'numeric' },
    { name: '2000_total', type: 'numeric' },
    { name: '2000_female', type: 'numeric' },
    { name: '2000_male', type: 'numeric' },
    { name: '2010_total', type: 'numeric' },
    { name: '2010_female', type: 'numeric' },
    { name: '2010_male', type: 'numeric' },
    { name: '2015_total', type: 'numeric' },
    { name: '2015_female', type: 'numeric' },
    { name: '2015_male', type: 'numeric' },
  ],
}
