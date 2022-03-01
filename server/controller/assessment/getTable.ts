import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment, Cycle, Table } from '@meta/assessment'

export const getTable = async (
  props: { assessment: Assessment; cycle: Cycle; tableName: string },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { assessment, cycle, tableName } = props

  return AssessmentRepository.getTable({ assessment, assessmentCycleUuid: cycle.uuid, tableName }, client)
}
