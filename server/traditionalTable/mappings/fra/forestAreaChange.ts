export default {
  tableName: 'forest_area_change',
  rows: {
    names: ['forest_expansion', 'afforestation', 'natural_expansion', 'deforestation'],
  },
  columns: [
    { name: '1990_2000', type: 'numeric' },
    { name: '2000_2010', type: 'numeric' },
    { name: '2010_2015', type: 'numeric' },
    { name: '2015_2020', type: 'numeric' },
  ],
}
