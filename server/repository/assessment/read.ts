import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const read = async (
  params: {
    name: string
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { name } = params

  return client.one<Assessment>(
    `select * from public.assessment where props ->> 'name' = $1;`,
    [name],
    Objects.camelize
  )
}
