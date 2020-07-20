/**
 * This file contains all section specs for all assessments
 */
import * as R from 'ramda'
import * as FRA from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from './sectionSpec'
import fra from './fra'
import panEuropean from './panEuropean'

const sectionSpecs = {
  [FRA.type]: fra,
  [PanEuropean.type]: panEuropean,
}

export const getSectionSpec = (assessmentType, sectionName) => R.pathOr({}, [assessmentType, sectionName], sectionSpecs)

export const getTableSectionSpecs = (assessmentType, sectionName) => {
  const sectionSpec = getSectionSpec(assessmentType, sectionName)
  return sectionSpec[SectionSpec.KEYS_SECTION.tableSections]
}

export const getTableSpecs = (assessmentType, sectionName) => {
  const tableSectionSpecs = getTableSectionSpecs(assessmentType, sectionName)
  return tableSectionSpecs.map((tableSectionSpec) => tableSectionSpec[SectionSpec.KEYS_TABLE_SECTION.tableSpecs]).flat()
}

export const getTableSpec = (assessmentType, sectionName, tableName) => {
  const tableSpecs = getTableSpecs(assessmentType, sectionName)
  return tableSpecs.find(R.propEq(SectionSpec.KEYS_TABLE.name, tableName))
}

export const getTableSpecExport = (assessmentType, sectionName) =>
  getTableSpecs(assessmentType, sectionName).find((tableSpec) => tableSpec[SectionSpec.KEYS_TABLE.dataExport] === true)
