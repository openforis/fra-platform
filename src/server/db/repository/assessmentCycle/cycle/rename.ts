import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  name: string
}

export const rename = async (props: Props, client: BaseProtocol = DB): Promise<Cycle> => {
  const { assessment, cycle, name } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycleSource = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })
  const schemaCycleTarget = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName: name })

  await client.query<void>(`alter schema ${schemaCycleSource} rename to ${schemaCycleTarget};`)

  return client.one<Cycle>(
    `
      update public.assessment_cycle
      set name = $2
      where uuid = $1
      returning *`,
    [cycle.uuid, name],
    Objects.camelize
  )
}
