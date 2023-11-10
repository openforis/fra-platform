import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.panEuropean }, client)

  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    await client.query(`

      update ${schemaCycle}.region_group
      set name = 'panEuropean' where name = 'fra2020';

      update ${schemaCycle}.region
      set region_group_id = 1 where region_code = 'FE';

      delete from ${schemaCycle}.region_group where name = 'secondary';

      `)
  })
}
