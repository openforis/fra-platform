import serialize from 'dom-serializer'
import { DomUtils, parseDocument } from 'htmlparser2'
import pgPromise from 'pg-promise'

import { AssessmentNames } from 'meta/assessment/assessment'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const TABLE = 'original_data_point'

const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest]
const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]

const _fixAHrefTags = (htmlString: string): string => {
  if (Objects.isEmpty(htmlString)) return htmlString

  const dom = parseDocument(htmlString, { lowerCaseAttributeNames: true, lowerCaseTags: true })
  const anchorTags = DomUtils.findAll((node) => node.type === 'tag' && node.name === 'a', dom.children)

  if (anchorTags.length === 0) return htmlString

  let changed = false
  for (let i = 0; i < anchorTags.length; i += 1) {
    const anchor = anchorTags[i]
    if (!anchor.attribs?.target) {
      anchor.attribs.target = '_blank'
      changed = true
    }
  }

  if (!changed) return htmlString

  return serialize(dom.children, { decodeEntities: false, xmlMode: false })
}

type OriginalDataPointUpdateDB = {
  id: number
  data_source_references: string | null
  [key: string]: unknown
}

const _fixODP = (originalDataPoint: OriginalDataPoint): OriginalDataPointUpdateDB => {
  const { dataSourceReferences } = originalDataPoint

  const extentComments =
    typeof originalDataPoint.comments?.[TableNames.extentOfForest] === 'string'
      ? originalDataPoint.comments[TableNames.extentOfForest]
      : ''

  const forestCharacteristicsComments =
    typeof originalDataPoint.comments?.[TableNames.forestCharacteristics] === 'string'
      ? originalDataPoint.comments[TableNames.forestCharacteristics]
      : ''

  const updatedValues: OriginalDataPointUpdateDB = {
    id: originalDataPoint.id,
    data_source_references: typeof dataSourceReferences === 'string' ? _fixAHrefTags(dataSourceReferences) : null,
    [commentColumnExtent]: _fixAHrefTags(extentComments),
    [commentColumnForestCharacteristics]: _fixAHrefTags(forestCharacteristicsComments),
  }

  return updatedValues
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    if (assessment.props.name === AssessmentNames.panEuropean) return

    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      const odps = await client.map<OriginalDataPoint>(
        `
          select *
          from ${schemaName}.${TABLE}
          where data_source_references ilike '%href%'
             or ${commentColumnExtent} ilike '%href%'
             or ${commentColumnForestCharacteristics} ilike '%href%'
        `,
        [],
        OriginalDataPointAdapter
      )

      if (odps.length === 0) {
        return
      }

      Logger.debug(`Fixing ${odps.length} ODPS for: ${assessment.props.name} ${cycle.name}`)

      const fixedODPs = odps.map((odp) => _fixODP(odp))

      const pgp = pgPromise()
      const cs = new pgp.helpers.ColumnSet<OriginalDataPointUpdateDB>(
        [
          { name: 'data_source_references', cast: 'text' },
          { name: commentColumnExtent, cast: 'text' },
          { name: commentColumnForestCharacteristics, cast: 'text' },
          { name: 'id', cast: 'bigint', cnd: true },
        ],
        { table: { table: TABLE, schema: schemaName } }
      )

      const query = `${pgp.helpers.update(fixedODPs, cs)} where v.id = t.id;`
      await client.query(query)
    })
  })
}
