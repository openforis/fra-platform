import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'

export const removeAssessment = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<{ id: number }> => {
  const { assessment } = params

  return client.one<Assessment>(`delete from public.assessment where id = $1 returning id;`, [assessment.id])
}
