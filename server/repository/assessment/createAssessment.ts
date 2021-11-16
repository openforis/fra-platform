import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const createAssessment = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  const ret = await client.one<Assessment>(`
  insert into assessment (props) values ('${JSON.stringify(assessment.props)}'::jsonb) returning  *;

`)
  return Objects.camelize(ret)
}
