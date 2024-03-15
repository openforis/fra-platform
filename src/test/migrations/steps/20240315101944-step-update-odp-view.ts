import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { getCreateSchemaCycleOriginalDataPointViewDDL } from 'server/repository/assessment/assessment/getCreateSchemaDDL'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)

  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    await client.query(getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle))
  })
}
