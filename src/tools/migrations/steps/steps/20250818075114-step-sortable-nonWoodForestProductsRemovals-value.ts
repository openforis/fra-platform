import { Arrays } from 'utils/arrays'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames, TableProps } from 'meta/assessment/table'

import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/cache/controller'
import { TableRedisRepository } from 'server/cache/repository/table'
import { ColRepository } from 'server/repository/assessment/col'
import { TableRepository } from 'server/repository/assessment/table'

const assessmentName = AssessmentNames.fra
const cycleNames = ['2025', 'latest']

const colNameSort = 'value'
const label = 'nonWoodForestProductsRemovals.value'
const tableName = TableNames.nonWoodForestProductsRemovals
const variableNames = Arrays.range(1, 11).map((i) => `product_${i}`)

const sortObject = {
  columnNames: [colNameSort],
  rowNames: variableNames,
}

type BaseProps = {
  assessment: Assessment
  cycles: Array<Cycle>
}

const _updateCol = async (props: BaseProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycles } = props

  const schema = Schemas.getName(assessment)
  const { id: colId } = await client.one(
    `select id from ${schema}.col where props -> 'labels' -> '${cycles.at(0).uuid}' ->> 'key' = '${label}' `
  )
  const colNameSortRecord = cycles.reduce<Record<string, string>>((acc, cycle) => {
    acc[cycle.uuid] = colNameSort
    return acc
  }, {})
  await ColRepository.update({ assessment, colId, colProps: { colNameSort: colNameSortRecord } })
}

type UpdateTableProps = {
  tableProps: TableProps
  cycles: Array<Cycle>
}

const _updateTableProps = (props: UpdateTableProps): TableProps => {
  const { cycles, tableProps } = props
  const sort = cycles.reduce<TableProps['sort']>((acc, cycle) => {
    acc[cycle.uuid] = sortObject
    return acc
  }, {})

  return { ...tableProps, sort }
}

const _updateTable = async (props: BaseProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycles } = props
  const table = await TableRedisRepository.getOne({ assessment, cycle: cycles.at(0), tableName })
  const tableProps = _updateTableProps({ tableProps: table.props, cycles })
  await TableRepository.update({ assessment, tableId: table.id, tableProps }, client)
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycles = assessment.cycles.filter((c) => cycleNames.includes(c.name))

  await _updateCol({ assessment, cycles }, client)
  await _updateTable({ assessment, cycles }, client)

  await CacheController.generateMetadata({ assessment }, client)
}
