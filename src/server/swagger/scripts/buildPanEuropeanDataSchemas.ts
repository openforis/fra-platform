import { OpenAPIV3 } from 'openapi-types'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { SectionRedisRepository } from 'server/cache/repository/section'

type Props = {
  assessment: Assessment
  cycle: Cycle
  spec: OpenAPIV3.Document
}

export const buildPanEuropeanDataSchemas = async (props: Props): Promise<void> => {
  const { assessment, cycle, spec } = props
  const components = spec.components ?? {}
  const schemas = components.schemas ?? {}

  const sections = await SectionRedisRepository.getMany({ assessment, cycle })
  const dataExportSectionNames = sections.reduce<Array<string>>((acc, section) => {
    section.subSections?.forEach((subSection) => {
      if (subSection?.props?.dataExport) {
        acc.push(subSection.props.name)
      }
    })
    return acc
  }, [])

  const sectionsMetadata = await SectionRedisRepository.getManyMetadata({
    assessment,
    cycle,
    sectionNames: dataExportSectionNames,
  })

  const tableNames: Array<string> = []
  const allVariables = new Set<string>()
  const allColumns = new Set<string>()
  const tableOptions: Record<string, { variables: Array<string>; columns: Array<string> }> = {}

  dataExportSectionNames.forEach((sectionName) => {
    const tableSections = sectionsMetadata[sectionName]
    if (!tableSections) return

    const tableSection = tableSections.find((ts) => ts.tables?.some((t) => t?.props?.dataExport))
    const table = tableSection?.tables?.find((t) => t?.props?.dataExport)
    if (!table) return

    const { name } = table.props
    if (!tableNames.includes(name)) tableNames.push(name)

    const columns = table.props.columnsExport?.[cycle.uuid] ?? table.props.columnNames?.[cycle.uuid] ?? []
    const variables =
      table.rows?.reduce<Array<string>>((acc, row) => {
        if (!!row.props?.variableName && !row.props?.excludeFromDataExport?.[cycle.uuid]) {
          acc.push(row.props.variableName)
        }
        return acc
      }, []) ?? []

    columns.forEach((col) => allColumns.add(col))
    variables.forEach((variable) => allVariables.add(variable))

    tableOptions[name] = {
      columns,
      variables,
    }
  })

  const columnsList = Array.from(allColumns)
  const variablesList = Array.from(allVariables)

  const _updateArrayEnum = (schemaName: string, values: Array<string>): void => {
    const schema = schemas[schemaName] as OpenAPIV3.ArraySchemaObject
    if (!schema) return
    schema.items = { ...(schema.items as OpenAPIV3.SchemaObject), type: 'string', enum: values }
    schema.example = values.slice(0, Math.min(2, values.length))
  }

  _updateArrayEnum('PanEuropeanTableNames', tableNames)
  _updateArrayEnum('PanEuropeanVariableNames', variablesList)
  _updateArrayEnum('PanEuropeanColumnNames', columnsList)

  const tableOptionsSchema: OpenAPIV3.SchemaObject = {
    type: 'object',
    properties: Object.entries(tableOptions).reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, [name, opts]) => {
      acc[name] = {
        type: 'object',
        properties: {
          variables: { type: 'array', items: { type: 'string', enum: opts.variables } },
          columns: { type: 'array', items: { type: 'string', enum: opts.columns } },
        },
      }
      return acc
    }, {}),
  }

  schemas.PanEuropeanTableOptions = tableOptionsSchema
  spec.components = { ...components, schemas }
}
