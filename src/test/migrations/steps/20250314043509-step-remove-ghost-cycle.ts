import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { Logger } from 'server/utils/logger'

const properties: Record<string, Array<string>> = {
  section: ['anchors', 'lables', 'descriptions', 'hidden', 'hints'],
  table_section: ['descriptions', 'lables'],
  table: ['cellsExportAlways', 'columnNames', 'columnsExport', 'columnsExportAlways', 'disableErrorMessage', 'style'],
  row: ['calculateFn', 'calculateIf', 'chart', 'excludeFromDataExport', 'linkToSection', 'validateFns', 'withReview'],
  col: ['calculateFn', 'classNames', 'labels', 'linkedNodes', 'select', 'style', 'validateFns', 'variableNo'],
}
const tableNames = Object.keys(properties)

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  const schemaAssessment = Schemas.getName(assessment)

  const selects = Object.entries(properties).flatMap(([tableName, props]) =>
    props.map(
      (prop) =>
        `select distinct jsonb_object_keys(props -> '${prop}') as uuid
         from ${schemaAssessment}.${tableName}`
    )
  )
  const queryGhosts = `with cycle_keys as (${selects.join(` union `)})
                 select *
                 from cycle_keys ck
                 where ck.uuid not in (select ac.uuid::text from public.assessment_cycle ac)`
  const cycleUuidsGhost = await client.map<string>(queryGhosts, [], ({ uuid }) => uuid)

  if (Objects.isEmpty(cycleUuidsGhost)) {
    Logger.info('ghost cycles not found')
  } else {
    Logger.info(`Found ${cycleUuidsGhost.length} ghost cycle(s) ${JSON.stringify(cycleUuidsGhost)}`)

    await Promises.each(cycleUuidsGhost, (cycleUuid) => {
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
      return client.query(query)
    })

    await AssessmentController.generateMetadataCache({ assessment }, client)
  }
}
