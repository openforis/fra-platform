import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { CacheController } from 'server/cache/controller'
import { TableRedisRepository } from 'server/cache/repository/table'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'

// Mirror tables
const tableNames = [
  // 2a
  TableNames.growingStockAvg,
  TableNames.growingStockTotal,

  // 2c
  TableNames.biomassStockAvg,
  TableNames.biomassStockTotal,

  // 2d
  TableNames.carbonStockAvg,
  TableNames.carbonStockTotal,
]

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames.latest

export default async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const showOriginalValueInfo = { [cycle.uuid]: true }

  await Promise.all(
    tableNames.map(async (tableName) => {
      const table = await TableRedisRepository.getOne({ assessment, cycle, tableName })
      const tableProps = { ...table.props, showOriginalValueInfo }
      await TableRepository.update({ assessment, tableId: table.id, tableProps }, client)
    })
  )

  await CacheController.generateMetadata({ assessment }, client)
}
