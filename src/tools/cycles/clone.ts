import '../scriptInit'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { ColProps, ColType } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { Table } from 'meta/assessment/table'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { CacheController } from 'server/cache/controller'
import { TableRedisRepository } from 'server/cache/repository/table'
import { MetadataController } from 'server/controller/metadata'
import { DB } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'

import { rawClone } from './_rawClone'

const client = DB
const assessmentName = AssessmentNames.fra
const cycleName = '2025'
const cycleNameClone = 'latest'

const _addColumns = async (props: { assessment: Assessment; cycle: Cycle }): Promise<void> => {
  const { assessment, cycle } = props
  // add 2024 column to disturbances and areaAffectedByFire tables
  const tables = await Promise.all([
    TableRedisRepository.getOne({ assessment, cycle, tableName: 'disturbances' }),
    TableRedisRepository.getOne({ assessment, cycle, tableName: 'areaAffectedByFire' }),
  ])
  await Promise.all(
    tables.map(async (table) => {
      const colProps: ColProps = { colName: '2024', colType: ColType.decimal }
      await MetadataController.addColumn({ assessment, cycles: [cycle], table, colProps }, client)
      const tableProps: Partial<Table['props']> = {
        style: {
          ...table.props.style,
          [cycle.uuid]: { gridTemplateColumns: `minmax(150px, auto) repeat(25, minmax(min-content, 1fr))` },
        },
      }
      await TableRepository.update({ assessment, tableId: table.id, tableProps }, client)
    })
  )
  await CacheController.generateMetadata({ assessment }, client)
}

export const cloneCycle = async (): Promise<void> => {
  const clone = await rawClone({ assessmentName, cycleNameSource: cycleName, cycleNameTarget: cycleNameClone }, client)

  await _addColumns(clone)
}

ToolsUtils.exec(cloneCycle)
