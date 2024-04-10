import { JSDOM } from 'jsdom'
import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CommentableDescription, CommentableDescriptionValue, DataSource } from 'meta/assessment'

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

const _fixDatasource = (dataSource: DataSource) => {
  const { reference } = dataSource
  const fixedReference = _fixAHrefTags(reference)
  return { ...dataSource, reference: fixedReference }
}

const _fixValue = (value: CommentableDescriptionValue) => {
  const text = _fixAHrefTags(value.text)
  const dataSources = value.dataSources?.map((ds) => _fixDatasource(ds))
  return {
    text,
    dataSources,
  }
}

const _fixDescription = (description: CommentableDescription) => {
  const value = _fixValue(description.value)
  return { ...description, value }
}

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      const descriptions = await client.map<CommentableDescription>(
        `
            select * from ${schemaName}.descriptions
            where value ->> 'text' ilike '%href%'
            or exists (
                select 1
                from jsonb_array_elements(value->'dataSources') as data_source
                where data_source ->>'reference' ilike '%href%'
            )
          `,
        [],
        (row) => Objects.camelize(row)
      )
      if (descriptions.length === 0) {
        return
      }
      Logger.debug(`Fixing ${descriptions.length} descriptions for: ${assessment.props.name} ${cycle.name}`)

      const fixedDescriptions = descriptions.map((d) => _fixDescription(d))

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
          table: { table: 'descriptions', schema: schemaName },
        }
      )

      const query = `${pgp.helpers.update(fixedDescriptions, cs)} where v.id = t.id;`
      await client.query(query)
    })
  })
}
