import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { DataRepository } from 'server/repository/assessmentCycle/data'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const refreshViews = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props
  const tables = await TableRepository.getMany({ assessment, cycle }, client)

  await Promise.all(
    tables.map(async (table) => DataRepository.createOrReplaceTableDataView({ assessment, cycle, table }))
  )
}
