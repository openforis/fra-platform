import { AssessmentNames, Cycle, TableNames, TableProps, Years } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'

type Report = Pick<TableProps, 'report'>

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  const report = assessment.cycles.reduce<Report>((acc: Report, cycle: Cycle) => {
    if (cycle.name === '2020') return acc

    return {
      ...acc,
      [cycle.uuid]: {
        columnsReport: Years.fraYears(cycle),
      },
    }
  }, {})

  const tableNames = [TableNames.extentOfForest, TableNames.forestCharacteristics]

  await Promise.all(
    tableNames.map(async (tableName) => {
      const table = await TableRepository.getOne({ assessment, tableName }, client)
      await TableRepository.update({ assessment, tableId: table.id, tableProps: { ...table.props, report } })
    })
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
