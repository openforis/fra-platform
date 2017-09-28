const R = require('ramda')

module.exports = {
  tableName: 'graduation_of_students',
  rows: {
    names: [
      'doctoral_degree',
      'doctoral_degree_of_which_female',
      'masters_degree',
      'masters_degree_of_which_female',
      'bachelors_degree',
      'bachelors_degree_of_which_female',
      'technician_certificate',
      'technician_certificate_of_which_female'
    ]
  },
  columns: R.map(year => ({name: year.toString(), type: 'numeric'}), R.range(2000, 2018))
}
