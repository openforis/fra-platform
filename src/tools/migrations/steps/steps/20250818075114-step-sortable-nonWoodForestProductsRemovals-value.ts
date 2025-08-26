import { Arrays } from 'utils/arrays'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { TableRedisRepository } from 'server/repository/redis/table'

const assessmentName = AssessmentNames.fra
const cycleName = 'latest'
const tableName = TableNames.nonWoodForestProductsRemovals
const colName = 'value'
const variableNames = Arrays.range(1, 11).map((i) => `product_${i}`)

const sortObject = {
  columnNames: [colName],
  rowNames: variableNames,
}

type BaseProps = {
  assessment: Assessment
  cycle: Cycle
}

const _updateTable = async (props: BaseProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props
  const table = await TableRedisRepository.getOne({ assessment, cycle, tableName })
  const tableProps = { sort: { [cycle.uuid]: sortObject } }
  await TableRepository.update({ assessment, tableId: table.id, tableProps }, client)
}

export default async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  await _updateTable({ assessment, cycle }, client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
