export default {
  tableName: 'table_1_4a',
  schemaName: 'pan_european',
  section: 'panEuropean_1_4_a',
  rows: {
    names: [
      'forest_2025',
      'forest_2020',
      'forest_2015',
      'forest_2010',
      'forest_2005',
      'forest_2000',
      'forest_1990',

      'other_wooded_land_2025',
      'other_wooded_land_2020',
      'other_wooded_land_2015',
      'other_wooded_land_2010',
      'other_wooded_land_2005',
      'other_wooded_land_2000',
      'other_wooded_land_1990',

      'total_forest_and_other_wooded_land_2025',
      'total_forest_and_other_wooded_land_2020',
      'total_forest_and_other_wooded_land_2015',
      'total_forest_and_other_wooded_land_2010',
      'total_forest_and_other_wooded_land_2005',
      'total_forest_and_other_wooded_land_2000',
      'total_forest_and_other_wooded_land_1990',
    ],
  },
  columns: [
    { name: 'above_ground', type: 'numeric' },
    { name: 'below_ground', type: 'numeric' },
    { name: 'deadwood', type: 'numeric' },
    { name: 'litter', type: 'numeric' },
    { name: 'soil_carbon', type: 'numeric' },
  ],
}
