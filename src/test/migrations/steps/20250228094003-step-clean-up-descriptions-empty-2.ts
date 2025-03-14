import { Promises } from 'utils/promises'

import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

const brTagRegex = '<br\\s*/?>'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promises.each(assessments, async (assessment: Assessment) => {
    await Promises.each(assessment.cycles, async (cycle: Cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
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
