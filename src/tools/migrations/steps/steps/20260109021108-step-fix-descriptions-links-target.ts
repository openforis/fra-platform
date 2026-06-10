import serialize from 'dom-serializer'
import { DomUtils, parseDocument } from 'htmlparser2'
import pgPromise from 'pg-promise'

import { CommentableDescription, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

type FixHtmlResult = { html: string | null; correctedLinks: number }

const _fixAHrefTags = (htmlString: string): FixHtmlResult => {
  if (Objects.isEmpty(htmlString)) return { html: htmlString, correctedLinks: 0 }

  const dom = parseDocument(htmlString, { decodeEntities: false, lowerCaseAttributeNames: true, lowerCaseTags: true })
  const anchorTags = DomUtils.findAll((node) => node.type === 'tag' && node.name === 'a', dom.children)

  if (anchorTags.length === 0) return { html: htmlString, correctedLinks: 0 }

  let correctedLinks = 0
  for (let i = 0; i < anchorTags.length; i += 1) {
    const anchor = anchorTags[i]
    if (!anchor.attribs?.target) {
      anchor.attribs.target = '_blank'
      correctedLinks += 1
    }
  }

  if (correctedLinks === 0) return { html: htmlString, correctedLinks: 0 }

  const html = serialize(dom.children, { decodeEntities: false, xmlMode: false })
  return { html, correctedLinks }
}

type FixResult<T> = { correctedLinks: number; value: T }

const _fixDatasource = (dataSource: DataSource): FixResult<DataSource> => {
  const { reference } = dataSource
  const { correctedLinks, html: fixedReference } = _fixAHrefTags(reference)
  return { value: { ...dataSource, reference: fixedReference }, correctedLinks }
}

const _fixValue = (value: CommentableDescriptionValue): FixResult<CommentableDescriptionValue> => {
  const { correctedLinks: correctedTextLinks, html: text } = _fixAHrefTags(value.text)
  const dataSourcesResults = value.dataSources?.map(_fixDatasource) ?? []

  const correctedLinks =
    correctedTextLinks + dataSourcesResults.reduce((acc, dataSourceResult) => acc + dataSourceResult.correctedLinks, 0)

  const dataSources = value.dataSources
    ? dataSourcesResults.map((dataSourceResult) => dataSourceResult.value)
    : undefined

  return { value: { ...value, text, dataSources }, correctedLinks }
}

const _fixDescription = (description: CommentableDescription): FixResult<CommentableDescription> => {
  const valueResult = _fixValue(description.value)
  return { value: { ...description, value: valueResult.value }, correctedLinks: valueResult.correctedLinks }
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      const descriptions = await client.map<CommentableDescription>(
        `
          select *
          from ${schemaName}.descriptions
          where value ->> 'text' ilike '%href%'
             or exists (
                  select 1
                  from jsonb_array_elements(coalesce(value->'dataSources', '[]'::jsonb)) as data_source
                  where data_source ->> 'reference' ilike '%href%'
              )
        `,
        [],
        (row) => Objects.camelize(row)
      )

      if (descriptions.length === 0) {
        return
      }

      let correctedLinks = 0
      const fixedDescriptions: Array<CommentableDescription> = []
      descriptions.forEach((description) => {
        const result = _fixDescription(description)
        correctedLinks += result.correctedLinks
        if (result.correctedLinks > 0) fixedDescriptions.push(result.value)
      })

      Logger.debug(
        `Fixing ${correctedLinks} links (${fixedDescriptions.length}/${descriptions.length} descriptions updated) for: ${assessment.props.name} ${cycle.name}`
      )

      if (fixedDescriptions.length === 0) {
        return
      }

      const pgp = pgPromise()
      const cs = new pgp.helpers.ColumnSet<CommentableDescription>(
        [
          { name: 'value', cast: 'jsonb' },
          { name: 'id', cast: 'bigint', cnd: true },
        ],
        { table: { table: 'descriptions', schema: schemaName } }
      )

      const query = `${pgp.helpers.update(fixedDescriptions, cs)} where v.id = t.id;`
      await client.query(query)
    })
  })
}
