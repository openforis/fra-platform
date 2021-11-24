import { DescriptionSpec } from '../sectionSpec/descriptionsSpec'
import { SectionExportSpec, SectionSpec, SectionTableSpec } from '../sectionSpec/sectionSpec'

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
  descriptions?: {
    analysisAndProcessing?: DescriptionSpec
    comments?: DescriptionSpec
    introductoryText?: DescriptionSpec
    nationalData?: DescriptionSpec
  }
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
      descriptions: {
        ...sectionSpecDefault.descriptions,
        ...props.descriptions,
      },
    }
  },
}
