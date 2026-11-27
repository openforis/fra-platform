import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle

  uuid: string
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, uuid } = props

  if (!uuid) throw new Error('Repository UUID is required')

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.one<RepositoryItem>(
    `
      delete from ${schemaCycle}.repository
      where uuid = $1
      returning *
    `,
    [uuid],
    (row) => Objects.camelize(row)
  )
}
