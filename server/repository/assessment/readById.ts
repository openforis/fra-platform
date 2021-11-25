import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const readById = async (
  params: {
    id: number
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { id } = params

  return client.one<Assessment>(`select * from public.assessment where id = $1;`, [id], Objects.camelize)
}
