import { Cycle } from '@core/meta/assessment/cycle'
import { BaseProtocol, DB } from '@server/db'

export const removeAssessmentCycle = async (
  params: {
    id: number
  },
  client: BaseProtocol = DB
): Promise<{ id: number }> => {
  const { id } = params

  return client.one<Cycle>(`delete from public.assessment_cycle where id = $1 returning id;`, [id])
}
