import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeMetadata = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props
  const { uuid: cycleUuid } = cycle
  const schemaAssessment = Schemas.getName(assessment)

  const tableNames = ['section', 'table_section', 'table', 'row', 'col']
  const properties: Record<string, Array<string>> = {
    section: ['anchors', 'lables', 'descriptions', 'hidden', 'hints'],
    table_section: ['descriptions', 'lables'],
    table: ['cellsExportAlways', 'columnNames', 'columnsExport', 'columnsExportAlways', 'disableErrorMessage'],
    row: ['calculateFn', 'calculateIf', 'chart', 'excludeFromDataExport', 'linkToSection', 'validateFns', 'withReview'],
    col: ['calculateFn', 'classNames', 'labels', 'linkedNodes', 'select', 'style', 'validateFns', 'variableNo'],
  }

  const query = tableNames.map((tableName) => {
    return `update ${schemaAssessment}.${tableName}
            set props =
                    (props
                        ${properties[tableName].map((prop) => `#- '{${prop},${cycleUuid}}'`).join(`
                         `)}
                        )
                        || jsonb_build_object('cycles', (props -> 'cycles') - '${cycleUuid}')`
  }).join(`;
  `)

  await client.query(query)
}
