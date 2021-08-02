import { DescriptionsSpec } from './descriptionsSpec'
import { TableSpec } from './tableSpec'

export interface SectionExportSpec {
  included: boolean
}

export interface SectionTableSpec {
  tableSpecs: Array<TableSpec>
  titleKey?: string
  descriptionKey?: string
}

export interface SectionSpec {
  dataExport: SectionExportSpec
  descriptions: DescriptionsSpec
  sectionAnchor: string
  sectionName: string
  showTitle: boolean
  tableSections?: Array<SectionTableSpec>
}
