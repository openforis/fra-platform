export default {
  tableName: 'table_4_5',
  schemaName: 'pan_european',
  section: 'panEuropean_4_5',
  rows: {
    names: [
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

      'volumeOfDeadwoodInFOWLBySpeciesGroups',

      'coniferous_2020',
      'coniferous_2015',
      'broadleaved_2020',
      'broadleaved_2015',
    ],
  },
  columns: [
    { name: 'total', type: 'numeric' },
    { name: 'standing', type: 'numeric' },
    { name: 'lying', type: 'numeric' },
  ],
}
