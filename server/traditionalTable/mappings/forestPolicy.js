module.exports = {
  tableName: 'forest_policy',
  rows: {
    names: [
      'policies_supporting_SFM',
      'legislations_supporting_SFM',
      'platform_for_stakeholder_participation',
      'existence_of_traceability_system'
    ]
  },
  columns: [
    {name: 'national_yes_no', type: 'text'},
    {name: 'sub_national_yes_no', type: 'text'}
  ]
}
