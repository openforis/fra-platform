export default {
  tableName: 'table_1_3b',
  schemaName: 'pan_european',
  section: 'panEuropean_1_3_b',
  rows: {
    names: [
      'forest_uneven_aged_stands_2020',
      'forest_uneven_aged_stands_2015',
      'forest_uneven_aged_stands_2010',
      'forest_uneven_aged_stands_2005',
      'forest_uneven_aged_stands_2000',
      'forest_uneven_aged_stands_1990',

      '_of_which_forest_available_for_wood_supply_2020',
      '_of_which_forest_available_for_wood_supply_2015',
      '_of_which_forest_available_for_wood_supply_2010',
      '_of_which_forest_available_for_wood_supply_2005',
      '_of_which_forest_available_for_wood_supply_2000',
      '_of_which_forest_available_for_wood_supply_1990',
    ],
  },
  columns: [
    { name: 'area', type: 'numeric' },
    { name: 'total_volume', type: 'numeric' },
    { name: 'less_or_equal_20_cm', type: 'numeric' },
    { name: '_21_40_cm', type: 'numeric' },
    { name: '_41_60_cm', type: 'numeric' },
    { name: 'greater_60_cm', type: 'numeric' },
    { name: 'unspecified', type: 'numeric' },
  ],
}
