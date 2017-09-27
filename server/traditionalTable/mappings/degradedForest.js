module.exports = {
  tableName: 'degraded_forest',
  rows: {
    names: [
      'does_country_monitor',
      'national_definition',
      'how_monitored'
    ]
  },
  columns: [
    {name: 'monitors_yes_no', type: 'text'},
    {name: 'explanation', type: 'text'}
  ]
}
