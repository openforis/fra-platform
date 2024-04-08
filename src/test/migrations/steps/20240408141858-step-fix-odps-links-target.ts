import { JSDOM } from 'jsdom'
import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { OriginalDataPoint } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { Logger } from 'server/utils/logger'

const _fixAHrefTags = (htmlString: string): string => {
  if (htmlString.length === 0) return htmlString

  const dom = new JSDOM(htmlString)
  const doc = dom.window.document

  const anchorTags = doc.querySelectorAll('a')

  if (anchorTags.length === 0) return htmlString

  for (let i = 0; i < anchorTags.length; i += 1) {
    const anchor = anchorTags[i]
    if (!anchor.hasAttribute('target') || anchor.getAttribute('target') === '') {
      anchor.setAttribute('target', '_blank')
    }
  }

  return doc.body.innerHTML
}

const _fixODP = (originalDataPoint: OriginalDataPoint): OriginalDataPoint => {
  const updatedValues: Partial<OriginalDataPoint> = {}

  if (originalDataPoint.dataSourceReferences) {
    updatedValues.dataSourceReferences = _fixAHrefTags(originalDataPoint.dataSourceReferences)
  }
  if (originalDataPoint.description) {
    updatedValues.description = _fixAHrefTags(originalDataPoint.description)
  }

  return {
    ...originalDataPoint,
    ...(updatedValues ?? {}),
  }
}

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      const odps = await client.map<OriginalDataPoint>(
        `
            select * from ${schemaName}.original_data_point
            where data_source_references ilike '%href%' or description ilike '%href%'
        `,
        [],
        (row) => Objects.camelize(row)
      )

      if (odps.length === 0) {
        return
      }
      Logger.debug(`Fixing ${odps.length} ODPS for: ${assessment.props.name} ${cycle.name}`)

      const fixedODPs = odps.map((odp) => _fixODP(odp))

      const pgp = pgPromise()
      const cs = new pgp.helpers.ColumnSet<OriginalDataPoint>(
        [
          { name: 'data_source_references', cast: 'text', prop: 'dataSourceReferences' },
          { name: 'description', cast: 'text', prop: 'description' },
          { name: 'id', cast: 'bigint', cnd: true },
        ],
        { table: { table: 'original_data_point', schema: schemaName } }
      )

      const query = `${pgp.helpers.update(fixedODPs, cs)} where v.id = t.id;`
      await client.query(query)
    })
  })
}
