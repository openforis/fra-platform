import { Promises } from 'utils/promises'

import { TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export default async () => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const _tables = await TableRepository.getMany({ assessment, cycle })

      const tables = _tables.filter((table) => table.props.name !== TableNames.valueAggregate)

      await Promise.all(
        tables.map(async (table) => {
          Logger.debug(`Creating materialized view for ${assessment.props.name} ${cycle.name} ${table.props.name}`)
          return DataRepository.createMaterializedFaoEstimateView({ assessment, cycle, table })
        })
      )
    })
  })
}
