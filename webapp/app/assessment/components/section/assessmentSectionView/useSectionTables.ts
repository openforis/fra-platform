// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'

const getTables = (assessmentType: any, sectionName: any, tableName: any) => {
  const tableSpec = SectionSpecs.getTableSpec(assessmentType, sectionName, tableName)
  const tableDataRequiredSpecs = tableSpec[SectionSpec.KEYS_TABLE.tableDataRequired]

  const table = {
    [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: assessmentType,
    [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: sectionName,
    [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: tableName,
  }

  if (R.isEmpty(tableDataRequiredSpecs)) {
    return [table]
  }

  const tablesRequired = tableDataRequiredSpecs
    .map((tableDataRequiredSpec: any) =>
      getTables(
        tableDataRequiredSpec[SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType],
        tableDataRequiredSpec[SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName],
        tableDataRequiredSpec[SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]
      )
    )
    .flat()

  return [...tablesRequired, table]
}

const useSectionTables = (assessmentType: any, sectionName: any) => {
  const tables = SectionSpecs.getTableSpecs(assessmentType, sectionName)
    .map((tableSpec: any) => getTables(assessmentType, sectionName, tableSpec[SectionSpec.KEYS_TABLE.name]))
    .flat()
  return R.uniq(tables)
}

export default useSectionTables
