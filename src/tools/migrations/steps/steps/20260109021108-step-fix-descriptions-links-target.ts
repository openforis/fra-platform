import serialize from 'dom-serializer'
import { DomUtils, parseDocument } from 'htmlparser2'
import pgPromise from 'pg-promise'

import { CommentableDescription, CommentableDescriptionValue, DataSource } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

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

const _fixDatasource = (dataSource: DataSource): DataSource => {
  const { reference } = dataSource
  const fixedReference = _fixAHrefTags(reference)
  return { ...dataSource, reference: fixedReference }
}

const _fixValue = (value: CommentableDescriptionValue): CommentableDescriptionValue => {
  const text = _fixAHrefTags(value.text)
  const dataSources = value.dataSources?.map(_fixDatasource)
  return { ...value, text, dataSources }
}

const _fixDescription = (description: CommentableDescription): CommentableDescription => {
  const value = _fixValue(description.value)
  return { ...description, value }
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

      Logger.debug(`Fixing ${descriptions.length} descriptions for: ${assessment.props.name} ${cycle.name}`)

      const fixedDescriptions = descriptions.map((d) => _fixDescription(d))

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
