module.exports = {
  tableName: 'growing_stock_composition',
  rows: {
    names: [
      'native_rank1',
      'native_rank2',
      'native_rank3',
      'native_rank4',
      'native_rank5',
      'native_rank6',
      'native_rank7',
      'native_rank8',
      'native_rank9',
      'native_rank10',
      'remaining_native',
      'total_native_placeholder', // Will contain no data in DB
      'introduced_tree_species_heading_placeholder', // Will contain no data in DB
      'introduced_rank1',
      'introduced_rank2',
      'introduced_rank3',
      'introduced_rank4',
      'introduced_rank5',
      'remaining_introduced_placeholder', // Will contain no data in DB
    ],
  },
  columns: [
    { name: 'scientific_name', type: 'text' },
    { name: 'common_name', type: 'text' },
    { name: '1990', type: 'numeric' },
    { name: '2000', type: 'numeric' },
    { name: '2010', type: 'numeric' },
    { name: '2015', type: 'numeric' },
    { name: '2020', type: 'numeric' },
  ],
}
