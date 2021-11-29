import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const read = async (
  props: { name: string } | { id: number },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  if ('id' in props) {
    return client.one<Assessment>(`select * from public.assessment where id = $1;`, [props.id], Objects.camelize)
  }

  return client.one<Assessment>(
    `select * from public.assessment where props ->> 'name' = $1;`,
    [props.name],
    Objects.camelize
  )
}
