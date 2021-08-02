import { AssessmentType } from '@core/assessment'
import { Arrays, Objects } from '@core/utils'
import { SectionSpecs, TableSummarySpec } from '@webapp/sectionSpec'

const getTables = (assessmentType: AssessmentType, sectionName: string, tableName: string): Array<TableSummarySpec> => {
  const tableSpec = SectionSpecs.getTableSpec(assessmentType, sectionName, tableName)
  const tableDataRequiredSpecs = tableSpec.tableDataRequired

  const table: TableSummarySpec = { assessmentType, sectionName, tableName }

  if (Objects.isEmpty(tableDataRequiredSpecs)) {
    return [table]
  }

  const tablesRequired = tableDataRequiredSpecs
    .map((tableDataRequiredSpec) =>
      getTables(
        tableDataRequiredSpec.assessmentType,
        tableDataRequiredSpec.sectionName,
        tableDataRequiredSpec.tableName
      )
    )
    .flat()

  return [...tablesRequired, table]
}

const useSectionTables = (assessmentType: AssessmentType, sectionName: string): Array<TableSummarySpec> => {
  const tables = SectionSpecs.getTableSpecs(assessmentType, sectionName)
    .map((tableSpec) => getTables(assessmentType, sectionName, tableSpec.name))
    .flat()
  return Arrays.unique(tables)
}

export default useSectionTables
