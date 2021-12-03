import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Cycle } from '@core/meta/assessment'

export const getAssessmentCycles = async (
  props: { assessment: Assessment },
  client: BaseProtocol = DB
): Promise<Array<Cycle>> => {
  const { assessment } = props
  return client
    .many<Cycle>(`select * from public.assessment_cycle where assessment_id = $1;`, [assessment.id])
    .then((data) => Objects.camelize(data))
}
