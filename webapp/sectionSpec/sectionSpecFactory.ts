import { DescriptionsSpec } from './descriptionsSpec'
import { SectionExportSpec, SectionSpec, SectionTableSpec } from './sectionSpec'

const sectionSpecDefault: SectionSpec = {
  sectionName: '',
  sectionAnchor: '',
  tableSections: [],
  showTitle: true,
  descriptions: {
    analysisAndProcessing: true,
    comments: true,
    introductoryText: false,
    nationalData: true,
  },
  dataExport: { included: true },
}

interface SectionSpecProps {
  dataExport?: SectionExportSpec
  descriptions?: DescriptionsSpec
  sectionAnchor?: string
  sectionName?: string
  showTitle?: boolean
  tableSections?: Array<SectionTableSpec>
}

export const SectionSpecFactory = {
  newInstance: (props: SectionSpecProps): SectionSpec => {
    return {
      ...sectionSpecDefault,
      ...props,
    }
  },
}
