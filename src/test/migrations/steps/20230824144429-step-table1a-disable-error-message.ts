import { TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  await client.query(`
      update ${Schemas.getName(assessment)}."table"
      set props = jsonb_set(
              props,
              '{disableErrorMessage}',
              jsonb_build_object('${cycle.uuid}', true),
              true
          )
      where props ->> 'name' = '${TableNames.extentOfForest}'
  `)
}
