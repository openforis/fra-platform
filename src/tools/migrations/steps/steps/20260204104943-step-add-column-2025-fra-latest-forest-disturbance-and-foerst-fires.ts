import { AssessmentNames } from 'meta/assessment/assessment'
import { ColProps, ColType } from 'meta/assessment/col'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Table, TableNames } from 'meta/assessment/table'

import { RowRedisRepository } from 'server/cache/repository/row'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { TableRedisRepository } from 'server/cache/repository/table'
import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames.latest
const tableNames = [TableNames.disturbances, TableNames.areaAffectedByFire]

export default async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const tables = await Promise.all(
    tableNames.map((tableName) => TableRedisRepository.getOne({ assessment, cycle, tableName }))
  )
  await Promise.all(
    tables.map(async (table) => {
      const colProps: ColProps = { colName: '2025', colType: ColType.decimal }
      await MetadataController.addColumn({ assessment, cycles: [cycle], table, colProps }, client)
      const tableProps: Partial<Table['props']> = {
        style: {
          ...table.props.style,
          [cycle.uuid]: { gridTemplateColumns: `minmax(150px, auto) repeat(26, minmax(min-content, 1fr))` },
        },
      }
      await TableRepository.update({ assessment, tableId: table.id, tableProps }, client)
    })
  )

  const force = true

  await RowRedisRepository.getRows({ assessment, force }, client)
  await SectionRedisRepository.getManyMetadata({ assessment, cycle, force }, client)
}
