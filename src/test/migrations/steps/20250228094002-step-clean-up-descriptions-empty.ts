import { Promises } from 'utils/promises'

import { Assessment, AssessmentNames, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

const brTagRegex = '<br\\s*/?>'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promises.each(assessments, async (assessment: Assessment) => {
    if (assessment.props.name === AssessmentNames.fra) {
      const schemaAssessment = Schemas.getName(assessment)
      // Remove print prop - only for FRA
      await client.query(`update ${schemaAssessment}.table
                          set props = props - 'print'
                          where props::text ilike '%pageBreakAfter%'  `)
    }

    await Promises.each(assessment.cycles, async (cycle: Cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      // Remove empty descriptions' break lines etc. at the start and end
      await client.query(`
          update ${schemaCycle}.descriptions
          set value = jsonb_set(
                  value,
                  '{text}',
                  to_jsonb(
                          regexp_replace(
                                  regexp_replace(
                                          value ->>'text',
                                          '^(<p>${brTagRegex}</p>|<div>${brTagRegex}</div>|\n)+',
                                          '',
                                          'i'
                                  ),
                                  '(<p>${brTagRegex}</p>|<div>${brTagRegex}</div>|\n)+$',
                                  '',
                                  'i'
                          )
                  )
                      )
          where value ->>'text' ~* '^(<p>${brTagRegex}</p>|<div>${brTagRegex}</div>|\n)+'
             or value ->>'text' ~* '(<p>${brTagRegex}</p>|<div>${brTagRegex}</div>|\n)+$'
      `)

      // Remove last br from inside tags:
      // e.g.
      // <p>Some content<br /></p>
      // <div>Some content<br /></div>
      await client.query(`
          update ${schemaCycle}.descriptions
          set value = jsonb_set(
                  value,
                  '{text}',
                  to_jsonb(
                          regexp_replace(
                                  value ->>'text',
                                  '${brTagRegex}\\s*(</p>|</div>)+$',
                                  '\\1',
                                  'i'
                          )
                  )
                      )
          where value ->>'text' ~* '${brTagRegex}\\s*(</p>|</div>)+$'
      `)
    })
  })
}
