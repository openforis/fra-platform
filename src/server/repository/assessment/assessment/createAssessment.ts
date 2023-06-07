import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { getOne } from 'server/repository/assessment/assessment/getOne'

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
  return getOne({ id: assessmentCreated.id }, client)
}
