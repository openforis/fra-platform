import { Objects } from '@utils/objects'

import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { read } from '@server/repository/assessment/assessment/read'

export const createAssessment = async (
  params: {
    assessment: Pick<Assessment, 'props' | 'metaCache'>
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  const assessmentCreated = await client.one<Assessment>(
    `
    insert into assessment (props, meta_cache) values ('${JSON.stringify(assessment.props)}'::jsonb, '${JSON.stringify(
      assessment.metaCache ?? {}
    )}'::jsonb) returning  *;`,
    [],
    Objects.camelize
  )
  return read({ id: assessmentCreated.id }, client)
}
