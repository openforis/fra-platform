/**
 * This file contains all section specs for all assessments
 */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'

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
  const sectionSpec = getSectionSpec(assessmentType, sectionName)
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
