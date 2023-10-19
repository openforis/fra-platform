import { Assessment, Cycle, OriginalDataPoint, TableNames } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'
import { User } from 'meta/user'

import { getOriginalDataPointVariables } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { notifyClientUpdate } from 'server/controller/cycleData/originalDataPoint/updateDependants/notifyClientUpdate'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies'
import { DataRedisRepository } from 'server/repository/redis/data'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionName?: string
  originalDataPoints: Array<{ originalDataPoint: OriginalDataPoint; notifyClient: boolean }>
  user: User
}

export const updateOriginalDataPointsDependentNodes = async (props: Props): Promise<void> => {
  const { assessment, cycle, sectionName, originalDataPoints, user } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  originalDataPoints.forEach(({ originalDataPoint }) => {
    if (!originalDataPoint.year) {
      throw new Error(`OriginalDataPoint ${originalDataPoint.id} is missing year`)
    }
  })

  const { countryIso } = originalDataPoints[0].originalDataPoint

  // 1. update cache
  const tableName = TableNames.originalDataPointValue
  await DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true })

  // 2. schedule dependencies update
  const nodes: Array<NodeUpdate> = []
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle, sectionName })

  originalDataPoints.forEach(({ originalDataPoint }) => {
    const colName = String(originalDataPoint.year)
    const nodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
      return { tableName, variableName, colName, value: undefined }
    })

    nodes.push(...nodes)
  })

  const nodeUpdates = { assessmentName, cycleName, countryIso, nodes }
  const propsDeps = { assessment, cycle, isODP: true, nodeUpdates, user }
  await scheduleUpdateDependencies(propsDeps)

  // 3. notifies client
  await notifyClientUpdate({ cycle, sectionName, assessment, countryIso, originalDataPoints })
}
