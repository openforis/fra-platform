import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { read } from './read'

export const removeCycle = async (
  params: {
    id: number
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { id } = params

  const assessmentId = await client.one<number>(
    `
    delete from public.assessment_cycle where id = $1 returning assessment_id;
  `,
    [id]
  )

  return read({ id: assessmentId }, client)
}
