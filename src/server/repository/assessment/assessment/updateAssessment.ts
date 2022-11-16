import { Objects } from '@utils/objects'

import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { read } from '@server/repository/assessment/assessment/read'

export const updateAssessment = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  const assessmentUpdated = await client.one<Assessment>(
    `update assessment set props = $1::jsonb where id = $2 returning  *;`,
    [JSON.stringify(assessment.props), assessment.id],
    (assessment) => {
      return { ...Objects.camelize(assessment), metaCache: assessment.metaCache }
    }
  )
  return read({ id: assessmentUpdated.id }, client)
}
