import serialize from 'dom-serializer'
import { DomUtils, parseDocument } from 'htmlparser2'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const _stripEmptyDivs = (html: string) => {
  const dom = parseDocument(html)
  const allDivs = DomUtils.findAll((node) => node.type === 'tag' && node.name === 'div', dom.children)
  allDivs.forEach((div) => {
    const isEmpty = DomUtils.textContent(div).trim() === ''
    if (isEmpty) {
      DomUtils.removeElement(div)
    }
  })

  return serialize(dom.children, { decodeEntities: false, xmlMode: false })
}

const assessmentName = AssessmentNames.fra
const cycleName = '2025'
const countryIso = 'ERI'
const sectionName = 'designatedManagementObjective'
const descriptionName = CommentableDescriptionName.reclassification

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName,
    cycleName,
  })
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const description: { text: string } = await client.one(
    `select
     d.value->>'text' as text
     from ${schemaCycle}.descriptions d
     where d.section_name = $1
       and d.country_iso  = $2
       and d.name         = $3;`,
    [sectionName, countryIso, descriptionName]
  )

  const strippedText = _stripEmptyDivs(description.text)

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
