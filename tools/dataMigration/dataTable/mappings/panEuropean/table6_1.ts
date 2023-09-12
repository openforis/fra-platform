export default {
  tableName: 'table_6_1',
  schemaName: 'pan_european',
  section: 'panEuropean_6_1',
  rows: {
    names: [
      'in_public_ownership_2020',
      'in_public_ownership_2015',
      'in_public_ownership_2010',
      'in_public_ownership_2005',
      'in_public_ownership_2000',
      'in_public_ownership_1990',

      'in_private_ownership_2020',
      'in_private_ownership_2015',
      'in_private_ownership_2010',
      'in_private_ownership_2005',
      'in_private_ownership_2000',
      'in_private_ownership_1990',

      'other_types_of_ownership_unknown_2020',
      'other_types_of_ownership_unknown_2015',
      'other_types_of_ownership_unknown_2010',
      'other_types_of_ownership_unknown_2005',
      'other_types_of_ownership_unknown_2000',
      'other_types_of_ownership_unknown_1990',
    ],
  },
  columns: [
    { name: 'total_forest_area', type: 'numeric' },
    { name: 'total_number_of_holdings', type: 'numeric' },
    { name: 'less_10_ha_area', type: 'numeric' },
    { name: 'less_10_ha_number', type: 'numeric' },
    { name: '_11_500_ha_area', type: 'numeric' },
    { name: '_11_500_ha_number', type: 'numeric' },
    { name: 'more_500_ha_area', type: 'numeric' },
    { name: 'more_500_ha_number', type: 'numeric' },
  ],
}
