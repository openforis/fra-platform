export default {
  tableName: 'table_1_3a2',
  schemaName: 'pan_european',
  section: 'panEuropean_1_3_a2',
  rows: {
    names: [
      'forest_available_for_wood_supply_even_aged_stands_of_which_2020',
      'forest_available_for_wood_supply_even_aged_stands_of_which_2015',
      'forest_available_for_wood_supply_even_aged_stands_of_which_2010',
      'forest_available_for_wood_supply_even_aged_stands_of_which_2005',
      'forest_available_for_wood_supply_even_aged_stands_of_which_2000',
      'forest_available_for_wood_supply_even_aged_stands_of_which_1990',

      'predominantly_coniferous_forest_2020',
      'predominantly_coniferous_forest_2015',
      'predominantly_coniferous_forest_2010',
      'predominantly_coniferous_forest_2005',
      'predominantly_coniferous_forest_2000',
      'predominantly_coniferous_forest_1990',

      'predominantly_broadleaved_forest_2020',
      'predominantly_broadleaved_forest_2015',
      'predominantly_broadleaved_forest_2010',
      'predominantly_broadleaved_forest_2005',
      'predominantly_broadleaved_forest_2000',
      'predominantly_broadleaved_forest_1990',

      'mixed_forest_2020',
      'mixed_forest_2015',
      'mixed_forest_2010',
      'mixed_forest_2005',
      'mixed_forest_2000',
      'mixed_forest_1990',
    ],
  },
  columns: [
    { name: 'total_volume', type: 'numeric' },
    { name: 'regeneration_phase', type: 'numeric' },
    { name: 'intermediate_phase', type: 'numeric' },
    { name: 'mature_phase', type: 'numeric' },
    { name: 'unspecified', type: 'numeric' },
  ],
}
