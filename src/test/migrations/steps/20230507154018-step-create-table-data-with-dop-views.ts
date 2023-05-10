import { TableNames } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { MetadataController } from '@server/controller/metadata'
import { BaseProtocol, DB } from '@server/db'
import { getTableDataWithODPCreateViewDDL } from '@server/repository/assessmentCycle/data/ddl/getTableDataWithODPCreateViewDDL'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  await Promise.all(
    assessment.cycles.map((cycle) =>
      Promise.all(
        [TableNames.extentOfForest, TableNames.forestCharacteristics].map(async (tableName) => {
          const table = await MetadataController.getTable({ tableName, cycle, assessment }, client)
          const ddl = getTableDataWithODPCreateViewDDL({ assessment, cycle, table })
          return DB.query(ddl)
        })
      )
    )
  )
}
