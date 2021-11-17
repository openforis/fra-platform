import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const createAssessment = async (
  params: {
    assessment: Pick<Assessment, 'props'>
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  return client.one<Assessment>(
    `
    insert into assessment (props) values ('${JSON.stringify(assessment.props)}'::jsonb) returning  *;`,
    [],
    Objects.camelize
  )
}
