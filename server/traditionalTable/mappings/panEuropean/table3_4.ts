module.exports = {
  tableName: 'table_3_4',
  schemaName: 'pan_european',
  section: 'panEuropean_3_4',
  rows: {
    names: [
      '_01st',
      '_02nd',
      '_03rd',
      '_04th',
      '_05th',
      '_06th',
      '_07th',
      '_08th',
      '_09th',
      '_10th',
      'remaining_total',
      'total',
    ],
  },
  columns: [
    { name: 'name_of_service_product', type: 'text' },
    { name: 'unit', type: 'text' },
    { name: 'service_provision_amount_of_service_product', type: 'numeric' },
    { name: 'service_provision_value_1000_national_currency', type: 'numeric' },
    { name: 'forest_service_category', type: 'text' },
  ],
}
