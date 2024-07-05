import { AssessmentNames, ColProps, ColType, CycleName, RowProps, RowType, TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { ColRepository } from 'server/repository/assessment/col'
import { RowRepository } from 'server/repository/assessment/row'
import { TableRepository } from 'server/repository/assessment/table'

const tableName = TableNames.sustainableDevelopment15_2_1_5

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  const { cycles } = assessment

  const table = await TableRepository.getOne({ assessment, tableName }, client)

  const rowProps: RowProps = { index: 1, type: RowType.noticeMessage }
  const row = await RowRepository.create({ assessment, cycles, table, rowProps }, client)

  const labels = cycles.reduce<ColProps['labels']>(
    (acc, cycle) => ({ ...acc, [cycle.uuid]: { key: 'fra.sustainableDevelopment.dataProvidedBy' } }),
    {}
  )
  const colSpans: Record<CycleName, number> = { '2020': 9, '2025': 15 }
  const style = cycles.reduce<ColProps['style']>(
    (acc, cycle) => ({ ...acc, [cycle.uuid]: { colSpan: colSpans[cycle.name], rowSpan: 1 } }),
    {}
  )
  const colProps: ColProps = { index: 0, colType: ColType.noticeMessage, labels, style }
  await ColRepository.create({ assessment, cycles, row, colProps }, client)

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
