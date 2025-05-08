import serialize from 'dom-serializer'
import { DomUtils, parseDocument } from 'htmlparser2'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const _stripEmptyContentByTag = (html: string, tag: string) => {
  const dom = parseDocument(html)
  const allTags = DomUtils.findAll((node) => node.type === 'tag' && node.name === tag, dom.children)

  allTags.forEach((element) => {
    const isEmpty = DomUtils.textContent(element).trim() === ''
    if (isEmpty) {
      DomUtils.removeElement(element)
    }
  })

  return serialize(dom.children, { decodeEntities: false, xmlMode: false })
}

const fixEritreaEmptyDescriptionDiv = async (schemaCycle: string, client: BaseProtocol) => {
  const countryIso = 'ERI'
  const sectionName = 'designatedManagementObjective'
  const descriptionName = CommentableDescriptionName.reclassification

  const description: { text: string } = await client.one(
    `select
     d.value->>'text' as text
     from ${schemaCycle}.descriptions d
     where d.section_name = $1
       and d.country_iso  = $2
       and d.name         = $3;`,
    [sectionName, countryIso, descriptionName]
  )

  const strippedText = _stripEmptyContentByTag(description.text, 'div')

  await client.query(
    `update ${schemaCycle}.descriptions d
     set value = jsonb_set(
       value,
       '{text}',
       to_jsonb($4::text),
       false
     )
     where d.section_name = $1
       and d.country_iso  = $2
       and d.name         = $3;`,
    [sectionName, countryIso, descriptionName, strippedText]
  )
}

const fixAlgeriaOriginalDataTableWidth = async (schemaCycle: string, client: BaseProtocol) => {
  const countryIso = 'DZA'
  const sectionName = 'designatedManagementObjective'
  const descriptionName = CommentableDescriptionName.originalData

  await client.query(
    `update ${schemaCycle}.descriptions
     set value = jsonb_set(
       value,
       '{text}',
       to_jsonb(
         replace(
           value->>'text',
           E',\\u00A0ce\\u00A0qui\\u00A0représente\\u00A0',
           ', ce qui représente '
         )
       )
     )
     where section_name = $1
       and country_iso  = $2
       and name         = $3;
    `,
    [sectionName, countryIso, descriptionName]
  )
}

const FixTurksAndCaicosIslandsEmptyDescriptionPTags = async (schemaCycle: string, client: BaseProtocol) => {
  const countryIso = 'TCA'
  const sectionName = 'extentOfForest'
  const descriptionName = CommentableDescriptionName.generalComments

  const description: { text: string } = await client.one(
    `select
     d.value->>'text' as text
     from ${schemaCycle}.descriptions d
     where d.section_name = $1
       and d.country_iso  = $2
       and d.name         = $3;`,
    [sectionName, countryIso, descriptionName]
  )

  const strippedText = _stripEmptyContentByTag(description.text, 'p')

  await client.query(
    `update ${schemaCycle}.descriptions d
     set value = jsonb_set(
       value,
       '{text}',
       to_jsonb($4::text),
       false
     )
     where d.section_name = $1
       and d.country_iso  = $2
       and d.name         = $3;`,
    [sectionName, countryIso, descriptionName, strippedText]
  )
}

export default async (client: BaseProtocol) => {
  const assessmentName = AssessmentNames.fra
  const cycleName = 'latest'

  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName,
      cycleName,
    },
    client
  )
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await Promise.all([
    fixEritreaEmptyDescriptionDiv(schemaCycle, client),
    fixAlgeriaOriginalDataTableWidth(schemaCycle, client),
    FixTurksAndCaicosIslandsEmptyDescriptionPTags(schemaCycle, client),
  ])
}
