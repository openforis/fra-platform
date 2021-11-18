export default {
  tableName: 'table_1_3a1',
  schemaName: 'pan_european',
  section: 'panEuropean_1_3_a1',
  rows: {
    names: [
      'forest_even_aged_stands_of_which_2015',
      'forest_even_aged_stands_of_which_2010',
      'forest_even_aged_stands_of_which_2005',
      'forest_even_aged_stands_of_which_2000',
      'forest_even_aged_stands_of_which_1990',

      'available_for_wood_supply_of_which_2015',
      'available_for_wood_supply_of_which_2010',
      'available_for_wood_supply_of_which_2005',
      'available_for_wood_supply_of_which_2000',
      'available_for_wood_supply_of_which_1990',

      'predominantly_coniferous_forest_2015',
      'predominantly_coniferous_forest_2010',
      'predominantly_coniferous_forest_2005',
      'predominantly_coniferous_forest_2000',
      'predominantly_coniferous_forest_1990',

      'predominantly_broadleaved_forest_2015',
      'predominantly_broadleaved_forest_2010',
      'predominantly_broadleaved_forest_2005',
      'predominantly_broadleaved_forest_2000',
      'predominantly_broadleaved_forest_1990',

      'mixed_forest_2015',
      'mixed_forest_2010',
      'mixed_forest_2005',
      'mixed_forest_2000',
      'mixed_forest_1990',
    ],
  },
  columns: [
    { name: 'total_area', type: 'numeric' },
    { name: 'regeneration_phase', type: 'numeric' },
    { name: 'intermediate_phase', type: 'numeric' },
    { name: 'mature_phase', type: 'numeric' },
    { name: 'unspecified', type: 'numeric' },
  ],
}
