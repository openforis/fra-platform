import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { SectionRedisRepository } from 'server/cache/repository/section'
import { TableRedisRepository } from 'server/cache/repository/table'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const tableName = 'table_2_5'
const columnToExclude = 'unknownMixedDegradation'

export default async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const table = await TableRedisRepository.getOne({ assessment, cycle, tableName })

  const currentColumnsExport = table.props.columnsExport?.[cycle.uuid] ?? []
  const columnsExport = {
    ...table.props.columnsExport,
    [cycle.uuid]: currentColumnsExport.filter((col) => col !== columnToExclude),
  }

  await TableRepository.update({ assessment, tableId: table.id, tableProps: { columnsExport } }, client)

  const force = true
  await SectionRedisRepository.getManyMetadata({ assessment, cycle, force }, client)
}
