/**
 * This file contains all section specs for all assessments + utility methods
 */
import { AssessmentType, FRA, PanEuropean } from '@core/assessment'

import FRASpecs from './fra'
import PanEuropeanSpecs from './panEuropean'
import { SectionSpec, SectionTableSpec } from './sectionSpec'
import { TableSpec } from './tableSpec'

const sectionSpecs: Record<string, Record<string, SectionSpec>> = {
  [FRA.type]: FRASpecs,
  [PanEuropean.type]: PanEuropeanSpecs,
}

const getSectionSpec = (assessmentType: AssessmentType, sectionName: string): SectionSpec =>
  sectionSpecs[assessmentType][sectionName]

const getSectionTableSpecs = (assessmentType: AssessmentType, sectionName: string): Array<SectionTableSpec> => {
  const sectionSpec = getSectionSpec(assessmentType, sectionName)
  return sectionSpec.tableSections
}

const getTableSpecs = (assessmentType: AssessmentType, sectionName: string): Array<TableSpec> => {
  const tableSectionSpecs = getSectionTableSpecs(assessmentType, sectionName)
  return tableSectionSpecs.map((tableSectionSpec) => tableSectionSpec.tableSpecs).flat()
}

const getTableSpec = (assessmentType: AssessmentType, sectionName: string, tableName: string): TableSpec => {
  const tableSpecs = getTableSpecs(assessmentType, sectionName)
  return tableSpecs.find((table) => table.name === tableName)
}

const getTableSpecExport = (assessmentType: AssessmentType, sectionName: string): TableSpec =>
  getTableSpecs(assessmentType, sectionName).find((tableSpec) => tableSpec.dataExport === true)

export const SectionSpecs = {
  getSectionSpec,
  getTableSpecs,
  getTableSpec,
  getTableSpecExport,
}
