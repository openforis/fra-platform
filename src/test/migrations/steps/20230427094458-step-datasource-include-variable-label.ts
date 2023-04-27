// @ts-nocheck
import { ColType, Row, RowType } from '@meta/assessment'
import { DataSourceColumn, DataSourceVariables } from '@meta/assessment/description'
import { DataSourceDescription } from '@meta/assessment/description/nationalDataDataSourceDescription'

import { MetadataController } from '@server/controller/metadata'
import { BaseProtocol } from '@server/db'

import { AssessmentCycleUtil } from '@test/migrations/steps/utils/getAssessmentCycle'

interface NationalDataDataSourceDescriptionDeprecated {
  table?: { columns: Array<DataSourceColumn>; dataSourceVariables?: DataSourceVariables }
  text?: { readOnly?: boolean }
}

const _filterRow = (row: Row) =>
  row.props.variableName &&
  row.props.type === RowType.data &&
  !row.cols.every((col) => [ColType.header, ColType.calculated].includes(col.props.colType))

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const sectionsMetadata = await MetadataController.getSectionsMetadata({ cycle, assessment }, client)
  const sections = await MetadataController.getSections({ cycle, assessment }, client)
  const variableMaps = await client.query(`select s.id                       as section_id,
                          t.id                       as table_id,
                          jsonb_object_agg(r.props ->> 'variableName', c.props -> 'labels') as variableName_to_label
                   from assessment_fra.section s
                            left join assessment_fra.table_section ts on s.id = ts.section_id
                            left join assessment_fra.table t on ts.id = t.table_section_id
                            left join assessment_fra.row r on t.id = r.table_id
                            left join assessment_fra.col c on r.id = c.row_id
                   where r.props -> 'cycles' ? '${cycle.uuid}'
                     and r.props -> 'variableName' is not null
                     and c.props -> 'cycles' ? '${cycle.uuid}'
                     and c.props -> 'labels' is not null
group by s.id, t.id`)

  const updateDescriptions = (subSection: NationalDataDataSourceDescriptionDeprecated) => {
    const description = subSection.props.descriptions[cycle.uuid]
    const dataSourceDescriptionOld = description.nationalData.dataSources
    const tableSection = sectionsMetadata[subSection.props.name]
    const table = tableSection[0].tables[0]

    const tableVariableMap = variableMaps.find((zxc: { table_id: number }) => +zxc.table_id === table.id)
    const tableVariables = table.rows.filter(_filterRow).map((row) => row.props.variableName)

    if (!dataSourceDescriptionOld.table) {
      return
    }
    const dsTable: Pick<DataSourceDescription, 'table'> = { variables: [] }

    if (dataSourceDescriptionOld.table.columns?.includes('typeOfDataSourceText')) {
      dsTable.typeOfDataSourceText = true
    }

    // Variable field is free text field only
    if (dataSourceDescriptionOld.table.columns?.includes('variable')) {
      return
    }

    dsTable.variables = tableVariables.map((variable) => {
      const dsVariable = {
        value: variable,
        label: tableVariableMap.variablename_to_label[variable][cycle.uuid],
      }

      if (dataSourceDescriptionOld.table.dataSourceVariables?.prefixes?.[variable]) {
        dsVariable.prefix = dataSourceDescriptionOld.table.dataSourceVariables.prefixes[variable]
      }

      return dsVariable
    })

    if (dataSourceDescriptionOld.table.dataSourceVariables?.include) {
      dataSourceDescriptionOld.table.dataSourceVariables?.include.forEach((variable) => {
        if (!dsTable.variables.includes(variable)) {
          dsTable.variables.push({ label: variable, value: variable })
        }
      })
    }

    // eslint-disable-next-line no-param-reassign
    subSection.props.descriptions[cycle.uuid].nationalData.dataSources.table = dsTable
  }

  sections.forEach((section) => {
    section.subSections.forEach((subSection) => {
      if (subSection.props.descriptions[cycle.uuid]?.nationalData?.dataSources) {
        console.log(JSON.stringify(subSection, null, 2))
        updateDescriptions(subSection)
        console.log(JSON.stringify(subSection, null, 2))
      }
    })
  })
}
