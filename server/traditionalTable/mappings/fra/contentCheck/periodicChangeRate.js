module.exports = {
  tableName: 'content_check_periodic_change_rates_view',
  rows: {
    names: [
      'forest_area_annual_net_change',
      'forest_area_annual_net_change_rate',
      'natural_forest_area_annual_net_change',
      'natural_forest_area_annual_net_change_rate',
      'other_wooded_land_annual_net_change',
      'other_wooded_land_annual_net_change_rate',
      'planted_forest_annual_net_change',
      'planted_forest_annual_net_change_rate',
      'primary_forest_annual_net_change',
      'primary_forest_annual_net_change_rate',
    ],
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
