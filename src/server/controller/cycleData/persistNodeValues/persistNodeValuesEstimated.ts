import { CountryIso } from '@meta/area'
import { ActivityLog, ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { NodeValuesEstimation } from '@meta/assessment/nodeValuesEstimation'
import { NodeUpdate } from '@meta/data'
import { User } from '@meta/user'

import { DB } from '@server/db'
import { NodeValueEstimationRepository } from '@server/repository/assessmentCycle/nodeValueEstimationRepository'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

import { persistNodeValues } from './persistNodeValues'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  estimation: NodeValuesEstimation
  nodes: Array<NodeUpdate>
  sectionName: string
  user: User
}

const getActivityLog = (props: Props): ActivityLog<NodeValuesEstimation> => {
  const { countryIso, estimation: target, sectionName: section, user } = props

  return { countryIso, message: ActivityLogMessage.nodeValuesEstimationCreate, section, target, user }
}

const getPersistNodeValuesProps = (props: Props): Parameters<typeof persistNodeValues>['0'] => {
  const { assessment, countryIso, cycle, nodes, sectionName, user } = props

  const nodeUpdates = { assessment, cycle, countryIso, nodes }
  const activityLogMessage = ActivityLogMessage.nodeValueEstimate

  return { activityLogMessage, nodeUpdates, sectionName, user }
}

export const persistNodeValuesEstimated = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, estimation } = props

  await DB.tx(async (client) => {
    await Promise.all([
      persistNodeValues(getPersistNodeValuesProps(props), client),
      NodeValueEstimationRepository.create({ assessment, countryIso, cycle, estimation }, client),
      ActivityLogRepository.insertActivityLog({ activityLog: getActivityLog(props), assessment, cycle }, client),
    ])
  })
}
