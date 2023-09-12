import { Label } from 'meta/assessment'

import { DescriptionsSpec } from './descriptionsSpec'
import { TableSpec } from './tableSpec'

export interface SectionExportSpec {
  included: boolean
}

export interface SectionTableSpec {
  tableSpecs: Array<TableSpec>
  titleKey?: string
  descriptionKey?: string
  migration?: {
    cycles?: Array<string>
    label?: Record<string, Label>
  }
}

export interface SectionSpec {
  dataExport: SectionExportSpec
  descriptions: DescriptionsSpec
  sectionAnchor: string
  sectionName: string
  showTitle: boolean
  tableSections?: Array<SectionTableSpec>
  migration?: {
    cycles?: Array<string>
    anchors?: Record<string, string>
    label?: Record<string, Label>
    hidden?: boolean
  }
}
