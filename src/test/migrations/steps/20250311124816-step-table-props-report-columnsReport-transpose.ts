import { Years } from 'meta/assessment'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames, TableProps } from 'meta/assessment/table'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'

type Report = Pick<TableProps, 'report'>

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  const recordReport = assessment.cycles.reduce<{ years: Report; transpose: Report }>(
    (acc, cycle: Cycle) => {
      if (cycle.name === '2020') return acc

      const years = { ...acc.years, [cycle.uuid]: { columnsReport: Years.fraYears(cycle) } }
      const transpose = { ...acc.transpose, [cycle.uuid]: { transpose: true } }
      return { years, transpose }
    },
    { years: {}, transpose: {} }
  )

  const tableNames = [
    TableNames.extentOfForest,
    TableNames.forestCharacteristics,
    TableNames.areaAffectedByFire,
    TableNames.disturbances,
    TableNames.sustainableDevelopment15_2_1_5,
  ]
  const tablesYears = [TableNames.extentOfForest, TableNames.forestCharacteristics] as Array<string>

  await Promise.all(
    tableNames.map(async (tableName) => {
      const table = await TableRepository.getOne({ assessment, tableName }, client)
      const report = tablesYears.includes(table.props.name) ? recordReport.years : recordReport.transpose
      await TableRepository.update({ assessment, tableId: table.id, tableProps: { ...table.props, report } })
    })
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
