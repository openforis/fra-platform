export default {
  tableName: 'table_6_5a',
  schemaName: 'pan_european',
  section: 'panEuropean_6_5_a',
  rows: {
    names: [
      'forestry_2015',
      'forestry_2010',
      'forestry_2005',
      'forestry_2000',
      'forestry_1990',

      'manufacture_of_wood_and_articles_in_wood_2015',
      'manufacture_of_wood_and_articles_in_wood_2010',
      'manufacture_of_wood_and_articles_in_wood_2005',
      'manufacture_of_wood_and_articles_in_wood_2000',
      'manufacture_of_wood_and_articles_in_wood_1990',

      'manufacture_of_paper_and_paper_products_2015',
      'manufacture_of_paper_and_paper_products_2010',
      'manufacture_of_paper_and_paper_products_2005',
      'manufacture_of_paper_and_paper_products_2000',
      'manufacture_of_paper_and_paper_products_1990',
    ],
  },
  columns: [
    { name: 'total', type: 'numeric' },
    { name: 'gender_male', type: 'numeric' },
    { name: 'gender_female', type: 'numeric' },
    { name: 'age_group_15_49', type: 'numeric' },
    { name: 'age_group_50_plus', type: 'numeric' },
  ],
}
