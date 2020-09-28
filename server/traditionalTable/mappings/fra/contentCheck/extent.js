const { extent } = require('../../../../../common/model/traditionalTable/contentCheck')

module.exports = {
  tableName: 'content_check_extent_view',
  rows: {
    names: extent.rowNames,
  },
  columns: [
    { name: '1990', type: 'numeric' },
    { name: '2000', type: 'numeric' },
    { name: '2010', type: 'numeric' },
    { name: '2015', type: 'numeric' },
    { name: '2016', type: 'numeric' },
    { name: '2017', type: 'numeric' },
    { name: '2018', type: 'numeric' },
    { name: '2019', type: 'numeric' },
    { name: '2020', type: 'numeric' },
  ],
}
