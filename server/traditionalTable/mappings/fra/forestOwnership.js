module.exports = {
  tableName: 'forest_ownership',
  rows: {
    names: [
      'private_ownership',
      'of_which_by_individuals',
      'of_which_by_private_businesses',
      'of_which_by_communities',
      'public_ownership',
      'other_or_unknown'
    ]
  },
  columns: [
    {name: '1990', type: 'numeric'},
    {name: '2000', type: 'numeric'},
    {name: '2010', type: 'numeric'},
    {name: '2015', type: 'numeric'}
  ]
}
