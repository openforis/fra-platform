import { Objects } from '@utils/objects'

import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { read } from '@server/repository/assessment/assessment/read'

export const updateDefaultCycle = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  const assessmentUpdated = await client.one<Assessment>(
    `update assessment set props = props || '{"defaultCycle": $1~}' where id = $2 returning  *;`,
    [assessment.props.defaultCycle, assessment.id],
    (assessment) => {
      return { ...Objects.camelize(assessment), metaCache: assessment.meta_cache }
    }
  )
  return read({ id: assessmentUpdated.id }, client)
}
