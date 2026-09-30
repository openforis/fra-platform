import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'

export type AssessmentCycle = {
  assessment: Assessment
  cycle: Cycle
}

export const getAssessmentCycles = async (client: BaseProtocol = DB): Promise<Array<AssessmentCycle>> => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)

  return assessments.flatMap<AssessmentCycle>((assessment) =>
    assessment.cycles.map<AssessmentCycle>((cycle) => ({ assessment, cycle }))
  )
}
