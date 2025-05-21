import { Promises } from 'utils/promises'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'

import { BaseProtocol, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promises.each(assessments, async (assessment: Assessment) => {
    if (assessment.props.name === AssessmentNames.fra) {
      const schemaAssessment = Schemas.getName(assessment)
      // Remove print prop - only for FRA
      await client.query(
        `update ${schemaAssessment}.table    set props = props - 'print'    where props::text ilike '%pageBreakAfter%'  `
      )
    }
    await Promise.all(
      assessment.cycles.map((cycle) => {
        const schemaCycle = Schemas.getNameCycle(assessment, cycle)
        // Remove empty descriptions at the start and end
        return client.query(`
      update ${schemaCycle}.descriptions
      set value = jsonb_set(
              value,
              '{text}',
              to_jsonb(
                      regexp_replace(
                              regexp_replace(
                                      value ->>'text',
                                      '^(<p><br></p>|\\n)+',
                                      '',
                                      'i'
                              ),
                              '(<p><br></p>|\\n)+$',
                              '',
                              'i'
                      )
              )
                  )
      where value ->>'text' ~* '^(<p><br></p>|\\n)+' or value ->>'text' ~* '(<p><br></p>|\\n)+$'
  `)
      })
    )
  })
}
