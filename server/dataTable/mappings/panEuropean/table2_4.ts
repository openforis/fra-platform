export default {
  tableName: 'table_2_4',
  schemaName: 'pan_european',
  section: 'panEuropean_2_4',
  rows: {
    names: [
      'forest_2015',
      'forest_2010',
      'forest_2005',
      'forest_2000',
      'forest_1990',

      'other_wooded_land_2015',
      'other_wooded_land_2010',
      'other_wooded_land_2005',
      'other_wooded_land_2000',
      'other_wooded_land_1990',

      'total_forest_and_other_wooded_land_2015',
      'total_forest_and_other_wooded_land_2010',
      'total_forest_and_other_wooded_land_2005',
      'total_forest_and_other_wooded_land_2000',
      'total_forest_and_other_wooded_land_1990',
    ],
  },
  columns: [
    { name: 'total_area_with_damage', type: 'numeric' },
    { name: 'insects_and_disease', type: 'numeric' },
    { name: 'wildlife_and_grazing', type: 'numeric' },
    { name: 'forest_operations', type: 'numeric' },
    { name: 'other', type: 'numeric' },
    { name: 'primarily_damaged_by_abiotic_agents', type: 'numeric' },
    { name: 'primarily_damaged_by_fire_total', type: 'numeric' },
    { name: 'of_which_human_induced', type: 'numeric' },
    { name: 'unspecified_mixed_damage', type: 'numeric' },
  ],
}
