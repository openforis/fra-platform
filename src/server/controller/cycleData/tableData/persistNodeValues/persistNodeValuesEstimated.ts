import { Country } from 'meta/area/country'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { User } from 'meta/user/user'

import { persistNodeValues } from 'server/controller/cycleData/tableData/persistNodeValues/persistNodeValues'
import { DB } from 'server/db/db'
import { NodeValueEstimationRepository } from 'server/db/repository/assessmentCycle/nodeValueEstimationRepository'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  estimation: NodeValuesEstimation
  nodes: Array<NodeUpdate>
  sectionName: string
  user: User
}

const getActivityLog = (props: Props): ActivityLog<NodeValuesEstimation> => {
  const { country, estimation: target, sectionName: section, user } = props
  const { countryIso } = country

  return { countryIso, message: ActivityLogMessage.nodeValuesEstimationCreate, section, target, user }
}

const getPersistNodeValuesProps = (props: Props): Parameters<typeof persistNodeValues>['0'] => {
  const { assessment, country, cycle, nodes, sectionName, user } = props
  const { countryIso } = country

  const nodeUpdates = { assessmentName: assessment.props.name, cycleName: cycle.name, countryIso, nodes }
  const activityLogMessage = ActivityLogMessage.nodeValueEstimate

  return { assessment, cycle, country, activityLogMessage, nodeUpdates, sectionName, user }
}

export const persistNodeValuesEstimated = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, estimation } = props
  const { countryIso } = country

  await DB.tx(async (client) => {
    await persistNodeValues(getPersistNodeValuesProps(props), client)
    await NodeValueEstimationRepository.create({ assessment, countryIso, cycle, estimation }, client)
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog: getActivityLog(props), assessment, cycle },
      client
    )
    await CountryService.updateLastEdit(
      {
        assessment,
        cycle,
        country,
        user: props.user,
        lastUpdateTimestamp,
      },
      client
    )
  })
}
