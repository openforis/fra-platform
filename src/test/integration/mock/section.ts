export const sectionParams = {
  props: {
    cycles: ['2020'],
    index: 9999,
    labels: { label1: { key: 'label1' } },
  },
}

export const subSectionParams = {
  props: {
    name: 'childSection',
    cycles: ['2020'],
    index: 8888,
    labels: { label1: { key: 'label1' } },
    anchors: { 'anchor-uuid': 'anchor' },
    showTitle: false,
    descriptions: { comments: false, nationalData: false, introductoryText: true, analysisAndProcessing: false },
  },
}

// {"showTitle": false, "descriptions": {"comments": false, "nationalData": false, "introductoryText": true, "analysisAndProcessing": false}}
