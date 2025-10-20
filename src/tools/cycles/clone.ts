import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { ColProps, ColType } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { Table } from 'meta/assessment/table'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'
import { DB, Schemas } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { TableRedisRepository } from 'server/repository/redis/table'

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
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  await DB.query(`drop schema if exists ${Schemas.getNameCycle(assessment, { name: cycleNameClone })} cascade;`)

  const user = await UserController.getOne({ email: 'fra@fao.org' }, client)
  const clone = await AssessmentController.cloneCycle({ assessment, cycle, name: cycleNameClone, user }, client)

  await _addColumns(clone)
}

ToolsUtils.exec(cloneCycle)
