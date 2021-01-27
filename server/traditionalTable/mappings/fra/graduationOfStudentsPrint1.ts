module.exports = {
  tableName: 'graduation_of_students',
  rows: {
    names: ['doctoral_degree', 'masters_degree', 'bachelors_degree', 'technician_certificate', 'total'],
  },
  columns: [
    { name: '1990_total', type: 'numeric' },
    { name: '1990_female', type: 'numeric' },
    { name: '1990_male', type: 'numeric' },
    { name: '2000_total', type: 'numeric' },
    { name: '2000_female', type: 'numeric' },
    { name: '2000_male', type: 'numeric' },
  ],
}
