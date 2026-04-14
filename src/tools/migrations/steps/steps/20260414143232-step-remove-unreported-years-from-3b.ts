import { AssessmentNames } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { ExplorerRedisRepository } from 'server/cache/repository/explorer'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'

const assessmentName = AssessmentNames.fra
const cycleNames = [CycleNames._2025, CycleNames.latest]
const tableName = TableNames.forestAreaWithinProtectedAreas
const yearsToExclude = new Set<ColName>(['2016', '2017', '2018', '2019'])

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycles = assessment.cycles.filter((cycle) => cycleNames.includes(cycle.name as CycleNames))

  await Promise.all(
    cycles.map(async (cycle) => {
      const table = await TableRepository.getOne({ assessment, cycle, tableName }, client)
      const currentColumnsExport = table.props.columnsExport?.[cycle.uuid]
      const nextCycleColumnsExport = currentColumnsExport.filter((colName) => !yearsToExclude.has(colName))

      const columnsExport = {
        ...table.props.columnsExport,
        [cycle.uuid]: nextCycleColumnsExport,
      }

      await TableRepository.update({ assessment, tableId: table.id, tableProps: { columnsExport } }, client)

      const force = true
      await ExplorerRedisRepository.getManyMetadata({ assessment, cycle, force }, client)
    })
  )
}
