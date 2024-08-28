import { Promises } from 'utils/promises'

import { TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { TableRepository } from 'server/repository/assessment/table'
import { DataRepository } from 'server/repository/assessmentCycle/data'

export default async (_: any) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' })
  await Promises.each(assessment.cycles, async (cycle) => {
    const table = await TableRepository.getOne({ assessment, cycle, tableName: TableNames.extentOfForest })
    await DataRepository.createOrReplaceTableDataView({ assessment, cycle, table })
    await AssessmentController.generateDataCache({ assessment, cycle, force: true })
  })
}
