import { ActivityLogMessage, Assessment, Cycle, TableNames } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { Logger } from 'server/utils/logger'

export const createCycle = async (
  props: { user: User; assessment: Assessment; name: string },
  client: BaseProtocol = DB
): Promise<{ assessment: Assessment; cycle: Cycle }> => {
  const { user, assessment, name } = props
  return client.tx(async (t) => {
    const { assessment: updatedAssessment, cycle } = await CycleRepository.create({ assessment, name }, t)

    const tables = (await TableRepository.getMany({ assessment, cycle })).filter(
      (table) => table.props.name !== TableNames.valueAggregate
    )

    await Promise.all(
      tables.map(async (table) => {
        Logger.debug(`Creating materialized view for ${assessment.props.name} ${cycle.name} ${table.props.name}`)
        return DataRepository.createMaterializedFaoEstimateView({ assessment, cycle, table })
      })
    )

    const message = ActivityLogMessage.assessmentCycleCreate
    const activityLog = { target: updatedAssessment, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment: updatedAssessment, cycle }, t)

    return { assessment: updatedAssessment, cycle }
  })
}
