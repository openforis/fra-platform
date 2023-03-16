import { Objects } from '@utils/objects'

import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { get } from '@server/repository/assessment/assessment/get'

export const createAssessment = async (
  params: {
    assessment: Pick<Assessment, 'props'>
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  const assessmentCreated = await client.one<Assessment>(
    `
        insert into assessment (props)
        values ('${JSON.stringify(assessment.props)}'::jsonb)
        returning *;`,
    [],
    Objects.camelize
  )
  return get({ id: assessmentCreated.id }, client)
}
