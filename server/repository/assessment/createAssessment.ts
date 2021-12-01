import { Assessment } from '@core/meta/assessment/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { read } from '@server/repository/assessment/read'

export const createAssessment = async (
  params: {
    assessment: Pick<Assessment, 'props'>
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  const assessmentCreated = await client.one<Assessment>(
    `
    insert into assessment (props) values ('${JSON.stringify(assessment.props)}'::jsonb) returning  *;`,
    [],
    Objects.camelize
  )
  return read({ id: assessmentCreated.id }, client)
}
