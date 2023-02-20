export default {
  tableName: 'table_3_1',
  schemaName: 'pan_european',
  section: 'panEuropean_3_1',
  rows: {
    names: [
      'forest_2020',
      'forest_2015',
      'forest_2010',
      'forest_2005',
      'forest_2000',
      'forest_1990',

      '_of_which_forest_available_for_wood_supply_2020',
      '_of_which_forest_available_for_wood_supply_2015',
      '_of_which_forest_available_for_wood_supply_2010',
      '_of_which_forest_available_for_wood_supply_2005',
      '_of_which_forest_available_for_wood_supply_2000',
      '_of_which_forest_available_for_wood_supply_1990',
    ],
  },
  columns: [
    { name: 'gross_annual_increment', type: 'numeric' },
    { name: 'natural_losses', type: 'numeric' },
    { name: 'net_annual_increment', type: 'numeric' },
    { name: 'fellings_total', type: 'numeric' },
    { name: '_of_which_of_natural_losses', type: 'numeric' },
  ],
}
