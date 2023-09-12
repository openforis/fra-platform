export default {
  tableName: 'table_2_5',
  schemaName: 'pan_european',
  section: 'panEuropean_2_5',
  rows: {
    names: [
      'header_2025',
      'agentName',

      'forest_2020',
      'forest_2015',
      'forest_2010',
      'forest_2005',
      'forest_2000',
      'forest_1990',

      'other_wooded_land_2020',
      'other_wooded_land_2015',
      'other_wooded_land_2010',
      'other_wooded_land_2005',
      'other_wooded_land_2000',
      'other_wooded_land_1990',

      'total_forest_and_other_wooded_land_2020',
      'total_forest_and_other_wooded_land_2015',
      'total_forest_and_other_wooded_land_2010',
      'total_forest_and_other_wooded_land_2005',
      'total_forest_and_other_wooded_land_2000',
      'total_forest_and_other_wooded_land_1990',
    ],
  },
  columns: [
    { name: 'total_area_of_degraded_land', type: 'numeric' },
    { name: 'grazing', type: 'numeric' },
    { name: 'repeated_fires', type: 'numeric' },
    { name: 'air_pollution', type: 'numeric' },
    { name: 'desertification', type: 'numeric' },
    { name: 'other_1', type: 'numeric' },
    { name: 'other_2', type: 'numeric' },
    { name: 'other_3', type: 'numeric' },
    { name: 'unknown', type: 'numeric' },
    { name: 'former_degraded_land_restored', type: 'numeric' },
  ],
}
