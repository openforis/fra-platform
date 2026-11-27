import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const dropViews = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props
  const tables = await TableRepository.getMany({ assessment, cycle }, client)
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  await Promise.all(
    tables.map((table) => {
      const tableName = table.props.name.toLowerCase()
      return DB.none(`drop view if exists ${schemaCycle}.${tableName} cascade`)
    })
  )
}
