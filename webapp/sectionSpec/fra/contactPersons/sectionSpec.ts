import { FRA } from '@core/assessment'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'

const section = FRA.sections['0'].children.a

const contactPersons = SectionSpecFactory.newInstance({
  sectionName: section.name,
  showTitle: false,
  dataExport: { included: false },
  descriptions: {
    analysisAndProcessing: false,
    comments: false,
    nationalData: false,
    introductoryText: true,
  },
})

export default contactPersons
