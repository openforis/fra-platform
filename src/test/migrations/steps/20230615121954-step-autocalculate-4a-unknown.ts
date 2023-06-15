import { BaseProtocol } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'
import { updateRowCalculateFn } from 'test/migrations/steps/utils/updateRowCalculateFn'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)

  const formula =
    'extentOfForest.forestArea || forestOwnership.private_ownership || forestOwnership.public_ownership ? Math.max(0, (extentOfForest.forestArea - (forestOwnership.private_ownership || 0) - (forestOwnership.public_ownership || 0) - (forestOwnership.other || 0)))  : null'
  const tableName = 'forestOwnership'
  const variableName = 'unknown'
  await updateRowCalculateFn({ assessment, cycle, formula, tableName, variableName }, client)
}
