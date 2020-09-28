const { periodicChangeRate } = require('../../../../../common/model/traditionalTable/contentCheck')

module.exports = {
  tableName: 'content_check_periodic_change_rates_view',
  rows: {
    names: periodicChangeRate.rowNames
  },
  columns: [
    { name: '1990-2000', type: 'numeric' },
    { name: '2000-2010', type: 'numeric' },
    { name: '2010-2015', type: 'numeric' },
    { name: '2015-2016', type: 'numeric' },
    { name: '2016-2017', type: 'numeric' },
    { name: '2017-2018', type: 'numeric' },
    { name: '2018-2019', type: 'numeric' },
    { name: '2019-2020', type: 'numeric' },
  ],
}
