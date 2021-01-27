/**
 * This file contains all section specs for all assessments
 */
import * as R from 'ramda'
import FRA from '@common/assessment/fra'
import PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from './sectionSpec'
import fra from './fra'
import panEuropean from './panEuropean'

const sectionSpecs = {
  [FRA.type]: fra,
  [PanEuropean.type]: panEuropean,
}

export const getSectionSpec = (assessmentType: any, sectionName: any) =>
  R.pathOr({}, [assessmentType, sectionName], sectionSpecs)

export const getTableSectionSpecs = (assessmentType: any, sectionName: any) => {
  const sectionSpec: { [key: string]: any } = getSectionSpec(assessmentType, sectionName)
  return sectionSpec[SectionSpec.KEYS_SECTION.tableSections]
}

export const getTableSpecs = (assessmentType: any, sectionName: any) => {
  const tableSectionSpecs = getTableSectionSpecs(assessmentType, sectionName)
  return tableSectionSpecs
    .map((tableSectionSpec: any) => tableSectionSpec[SectionSpec.KEYS_TABLE_SECTION.tableSpecs])
    .flat()
}

export const getTableSpec = (assessmentType: any, sectionName: any, tableName: any) => {
  const tableSpecs = getTableSpecs(assessmentType, sectionName)
  return tableSpecs.find(R.propEq(SectionSpec.KEYS_TABLE.name, tableName))
}

export const getTableSpecExport = (assessmentType: any, sectionName: any) =>
  getTableSpecs(assessmentType, sectionName).find(
    (tableSpec: any) => tableSpec[SectionSpec.KEYS_TABLE.dataExport] === true
  )
