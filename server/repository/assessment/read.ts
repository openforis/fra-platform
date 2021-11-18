import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const read = async (
  params: {
    assessment: Pick<Assessment, 'props'>
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  return client.one<Assessment>(
    `select * from public.assessment where props ->> 'name' = $1;`,
    [assessment.props.name],
    Objects.camelize
  )
}
