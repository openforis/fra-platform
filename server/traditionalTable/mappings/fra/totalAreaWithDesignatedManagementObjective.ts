export default {
  tableName: 'total_area_with_designated_management_objective',
  section: 'designatedManagementObjective',
  rows: {
    names: ['production', 'protection_of_soil_and_water', 'conservation_of_biodiversity', 'social_services', 'other'],
  },
  columns: [
    { name: '1990', type: 'numeric' },
    { name: '2000', type: 'numeric' },
    { name: '2010', type: 'numeric' },
    { name: '2015', type: 'numeric' },
    { name: '2020', type: 'numeric' },
  ],
}
