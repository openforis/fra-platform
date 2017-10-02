module.exports = {
  tableName: 'employment',
  rows: {
    names: [
      'employment_in_forestry_and_logging',
      'of_which_silviculture_and_other_forestry_activities',
      'of_which_logging',
      'of_which_gathering_of_non_wood_forest_products',
      'of_which_support_services_to_forestry'
    ]
  },
  columns: [
    {name: '1990', type: 'numeric'},
    {name: '1990_female', type: 'numeric'},
    {name: '2000', type: 'numeric'},
    {name: '2000_female', type: 'numeric'},
    {name: '2010', type: 'numeric'},
    {name: '2010_female', type: 'numeric'},
    {name: '2015', type: 'numeric'},
    {name: '2015_female', type: 'numeric'}
  ]
}
