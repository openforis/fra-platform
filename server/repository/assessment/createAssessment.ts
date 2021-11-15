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

  const query = `
  insert into assessment (props) values ('${JSON.stringify(assessment.props)}'::jsonb) returning  *;

`
  const ret = await client.one<Assessment>(query)
  return Objects.camelize(ret)
}
