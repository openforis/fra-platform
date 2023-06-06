import * as pgPromise from 'pg-promise'

import {
  ColType,
  CommentableDescription,
  DataSource,
  DataSourceDescriptionTable,
  DataSourceVariable,
  Label,
  Row,
  RowType,
  SubSection,
  VariableName,
} from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, Schemas } from 'server/db'

interface DataSourceVariablesDeprecated {
  // Custom i18n keys to include
  include: Array<string>
  prefixes?: Record<VariableName, Label>
}

type DataSourceColumnDeprecated =
  | 'referenceToTataSource'
  | 'typeOfDataSource'
  | 'typeOfDataSourceText'
  | 'fraVariable'
  | 'variable'
  | 'yearForDataSource'
  | 'comments'

interface NationalDataDataSourceDescriptionDeprecated {
  table?: { columns: Array<DataSourceColumnDeprecated>; dataSourceVariables?: DataSourceVariablesDeprecated }
  text?: { readOnly?: boolean }
}

export interface DataSourceValueDeprecated {
  uuid?: string
  reference: {
    text: string
    link?: string
  }
  type: string
  fraVariables?: string[]
  variable?: string
  year: string
  comments: string
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
      if (assessment.props.name === 'fra' && cycle.name === '2020') {
        // eslint-disable-next-line no-continue
        continue
      }

      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
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
        const dataSourceDescriptionOld = description.nationalData.dataSources as unknown as NationalDataDataSourceDescriptionDeprecated
        const tableSection = sectionsMetadata[subSection.props.name]
        const table = tableSection[0].tables[0]

        const tableVariableMap = variableMaps.find((zxc: { table_id: number }) => +zxc.table_id === table.id)
        const tableVariables = table.rows.filter(_filterRow).map((row) => row.props.variableName)

        if (!dataSourceDescriptionOld.table) {
          return
        }
        const dsTable: DataSourceDescriptionTable = {}

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
            variableName: variable,
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

      // Update section metadata
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

      // Update description values
      // eslint-disable-next-line no-await-in-loop
      const descriptions = await client.query(
        `select * from ${schemaCycle}.descriptions where name = 'dataSources' and value -> 'dataSources' is not null`
      )

      for (let k = 0; k < descriptions.length; k += 1) {
        const description = descriptions[k]
        description.value.dataSources = description.value.dataSources.map((dataSource: DataSourceValueDeprecated) => {
          const dataSourceValue = {} as DataSource
          if (dataSource.uuid) {
            dataSourceValue.uuid = dataSource.uuid
          }
          if (dataSource.reference) {
            dataSourceValue.reference = dataSource.reference
          }
          if (dataSource.type) {
            dataSourceValue.type = dataSource.type
          }
          if (dataSource.fraVariables) {
            dataSourceValue.variables = dataSource.fraVariables
          }
          if (dataSource.variable) {
            dataSourceValue.variables = [dataSource.variable]
          }
          if (dataSource.year) {
            dataSourceValue.year = dataSource.year
          }
          if (dataSource.comments) {
            dataSourceValue.comments = dataSource.comments
          }
          return dataSourceValue
        })

        const pgp = pgPromise()
        const cs = new pgp.helpers.ColumnSet<CommentableDescription>(
          [
            {
              name: 'value',
              cast: 'jsonb',
            },
            {
              name: 'id',
              cast: 'bigint',
              cnd: true,
            },
          ],
          {
            table: { table: 'descriptions', schema: schemaCycle },
          }
        )

        const query = `${pgp.helpers.update(descriptions, cs)} where v.id = t.id;`
        // eslint-disable-next-line no-await-in-loop
        await client.query(query)
      }
    }
  }
}
