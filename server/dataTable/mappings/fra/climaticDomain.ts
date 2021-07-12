export default {
  tableName: 'climatic_domain',
  section: 'extentOfForest',
  rows: {
    names: ['boreal', 'temperate', 'sub_tropical', 'tropical'],
  },
  columns: [
    { name: 'percentOfForestArea2015', type: 'numeric' }, // "Override" in the UI
  ],
}
