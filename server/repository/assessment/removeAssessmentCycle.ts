import { Cycle } from '@core/meta/assessment/cycle'
import { BaseProtocol, DB } from '@server/db'

export const removeAssessmentCycle = async (
  params: {
    assessmentCycleId: number
  },
  client: BaseProtocol = DB
): Promise<{ id: number }> => {
  const { assessmentCycleId } = params

  return client.one<Cycle>(`delete from public.assessment_cycle where id = $1 returning id;`, [assessmentCycleId])
}
