import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  name: string
}

export const rename = async (props: Props, client: BaseProtocol = DB): Promise<Cycle> => {
  const { assessment, cycle, name } = props

  const schemaCycleSource = Schemas.getNameCycle(assessment, cycle)
  const schemaCycleTarget = Schemas.getNameCycle(assessment, { ...cycle, name })

  await DB.query<void>(`alter schema ${schemaCycleSource} rename to ${schemaCycleTarget};`)

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
