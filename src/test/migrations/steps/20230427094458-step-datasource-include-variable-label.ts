import { ColType, DataSourceDescriptionTable, DataSourceVariable, Row, RowType, SubSection } from '@meta/assessment'
import { DataSourceColumn, DataSourceVariables } from '@meta/assessment/description'

import { AssessmentController } from '@server/controller/assessment'
import { MetadataController } from '@server/controller/metadata'
import { BaseProtocol, Schemas } from '@server/db'

interface NationalDataDataSourceDescriptionDeprecated {
  table?: { columns: Array<DataSourceColumn>; dataSourceVariables?: DataSourceVariables }
  text?: { readOnly?: boolean }
}

const _filterRow = (row: Row) =>
  row.props.variableName &&
  row.props.type === RowType.data &&
  !row.cols.every((col) => [ColType.header, ColType.calculated].includes(col.props.colType))

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < assessments.length; i += 1) {
    const assessment = assessments[i]
    const schemaName = Schemas.getName(assessment)
    // eslint-disable-next-line no-restricted-syntax
    for (let j = 0; j < assessment.cycles.length; j += 1) {
      const cycle = assessment.cycles[j]
      // dataSource not supported in fra 2020
      if (cycle.name === '2020' && assessment.props.name === 'fra') {
        return
      }
      // eslint-disable-next-line no-await-in-loop
      const sectionsMetadata = await MetadataController.getSectionsMetadata({ cycle, assessment }, client)
      // eslint-disable-next-line no-await-in-loop
      const sections = await MetadataController.getSections({ cycle, assessment }, client)
      // eslint-disable-next-line no-await-in-loop
      const variableMaps = await client.query(`
                   select s.id                       as section_id,
                          t.id                       as table_id,
                          jsonb_object_agg(r.props ->> 'variableName', c.props -> 'labels') as variableName_to_label
                   from ${schemaName}.section s
                            left join ${schemaName}.table_section ts on s.id = ts.section_id
                            left join ${schemaName}.table t on ts.id = t.table_section_id
                            left join ${schemaName}.row r on t.id = r.table_id
                            left join ${schemaName}.col c on r.id = c.row_id
                   where r.props -> 'cycles' ? '${cycle.uuid}'
                     and r.props -> 'variableName' is not null
                     and c.props -> 'cycles' ? '${cycle.uuid}'
                     and c.props -> 'labels' is not null
                     group by s.id, t.id`)

      const updateDescriptions = (subSection: SubSection) => {
        const description = subSection.props.descriptions[cycle.uuid]
        const dataSourceDescriptionOld = description.nationalData
          .dataSources as unknown as NationalDataDataSourceDescriptionDeprecated
        const tableSection = sectionsMetadata[subSection.props.name]
        const table = tableSection[0].tables[0]

        const tableVariableMap = variableMaps.find((zxc: { table_id: number }) => +zxc.table_id === table.id)
        const tableVariables = table.rows.filter(_filterRow).map((row) => row.props.variableName)

        if (!dataSourceDescriptionOld.table) {
          return
        }
        const dsTable: DataSourceDescriptionTable = { variables: [] }

        if (dataSourceDescriptionOld.table.columns?.includes('typeOfDataSourceText')) {
          dsTable.typeOfDataSourceText = true
        }

        // Variable field is free text field only
        if (dataSourceDescriptionOld.table.columns?.includes('variable')) {
          // eslint-disable-next-line no-param-reassign
          subSection.props.descriptions[cycle.uuid].nationalData.dataSources.table = dsTable
          return
        }

        dsTable.variables = tableVariables.map((variable) => {
          const dsVariable: DataSourceVariable = {
            value: variable,
            label: tableVariableMap.variablename_to_label[variable][cycle.uuid],
          }

          if (dataSourceDescriptionOld.table.dataSourceVariables?.prefixes?.[variable]) {
            dsVariable.prefixLabel = dataSourceDescriptionOld.table.dataSourceVariables.prefixes[variable]
          }

          return dsVariable
        })

        // eslint-disable-next-line no-param-reassign
        subSection.props.descriptions[cycle.uuid].nationalData.dataSources.table = dsTable
      }

      for (let x = 0; x < sections.length; x += 1) {
        const section = sections[x]
        for (let y = 0; y < section.subSections.length; y += 1) {
          const subSection = section.subSections[y]
          if (subSection.props.descriptions[cycle.uuid]?.nationalData?.dataSources) {
            updateDescriptions(subSection)
            const query = `update ${schemaName}.section set props = props || '{"descriptions": ${JSON.stringify(
              subSection.props.descriptions
            )}}' where id = ${subSection.id}`
            // eslint-disable-next-line no-await-in-loop
            await client.query(query)
          }
        }
      }
    }
  }
}
