export const sectionParams = (cycleUuid: string) => ({
  props: {
    cycles: [cycleUuid],
    index: 9999,
    labels: { label1: { key: 'label1' } },
    anchors: {},
  },
})

export const subSectionParams = (cycleUuid: string) => ({
  props: {
    name: 'childSection',
    cycles: [cycleUuid],
    index: 8888,
    labels: { label1: { key: 'label1' } },
    anchors: { 'anchor-uuid': 'anchor' },
    showTitle: false,
    descriptions: {},
  },
})

// {"showTitle": false, "descriptions": {"comments": false, "nationalData": false, "introductoryText": true, "analysisAndProcessing": false}}
