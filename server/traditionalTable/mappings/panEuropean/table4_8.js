module.exports = {
  tableName: 'table_4_8',
  schemaName: 'pan_european',
  section: 'panEuropean_4_8',
  rows: {
    names: [
      'trees_2015',
      'trees_2010',
      'trees_2005',
      'trees_2000',
      'trees_1990',
      
      'birds_2015',
      'birds_2010',
      'birds_2005',
      'birds_2000',
      'birds_1990',

      'mammals_2015',
      'mammals_2010',
      'mammals_2005',
      'mammals_2000',
      'mammals_1990',

      'other_vertebrates_2015',
      'other_vertebrates_2010',
      'other_vertebrates_2005',
      'other_vertebrates_2000',
      'other_vertebrates_1990',
      
      'invertebrates_2015',
      'invertebrates_2010',
      'invertebrates_2005',
      'invertebrates_2000',
      'invertebrates_1990',

      'vascular_plants_2015',
      'vascular_plants_2010',
      'vascular_plants_2005',
      'vascular_plants_2000',
      'vascular_plants_1990',

      'cryptogams_and_fungi_2015',
      'cryptogams_and_fungi_2010',
      'cryptogams_and_fungi_2005',
      'cryptogams_and_fungi_2000',
      'cryptogams_and_fungi_1990',
    ],
  },
  columns: [
      { name: 'total_of_taxa', type: 'numeric' },
      { name: 'vulnerable', type: 'numeric' },
      { name: 'endangered', type: 'numeric' },
      { name: 'critically_endangered', type: 'numeric' },
      { name: 'extinct_in_the_wild', type: 'numeric' },      
    ],
}
