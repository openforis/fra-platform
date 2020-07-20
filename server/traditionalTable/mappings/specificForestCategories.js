module.exports = {
  tableName: 'specific_forest_categories',
  rows: {
    names: ['primary_forest', 'temporarily_unstocked', 'bamboo', 'mangroves', 'rubber_wood'],
  },
  columns: [
    { name: '1990', type: 'numeric' },
    { name: '2000', type: 'numeric' },
    { name: '2010', type: 'numeric' },
    { name: '2015', type: 'numeric' },
    { name: '2020', type: 'numeric' },
  ],
}
