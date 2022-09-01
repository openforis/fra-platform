import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'

import section from './section'
import TableSpec from './tableSpec'

const sectionSpec = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: '',
  tableSections: [{ tableSpecs: TableSpec }],
  showTitle: false,
  dataExport: { included: false },
  descriptions: {
    nationalData: false,
    analysisAndProcessing: false,
    comments: false,
  },
})

export default sectionSpec
