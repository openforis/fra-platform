import { CountryIso } from 'meta/area'
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
  originalDataPoints: Array<OriginalDataPoint>
  user: User
  notifyClient?: boolean
}

export const updateOriginalDataPointsDependentNodes = async (props: Props): Promise<void> => {
  const { assessment, cycle, sectionName, originalDataPoints: _originalDataPoints, user, notifyClient = true } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const originalDataPoints = _originalDataPoints.filter((originalDataPoint) => originalDataPoint.year)

  if (!originalDataPoints.length) {
    return
  }

  // 1. update cache
  const tableName = TableNames.originalDataPointValue
  // Update cacheCountryTable for all countries for original data points
  await Promise.all(
    originalDataPoints.map((originalDataPoint) => {
      const { countryIso } = originalDataPoint
      return DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true })
    })
  )

  // 2. schedule dependencies update
  const allNodes: Record<CountryIso, Array<NodeUpdate>> = {} as Record<CountryIso, Array<NodeUpdate>>
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle, sectionName })

  originalDataPoints.forEach((originalDataPoint) => {
    const colName = String(originalDataPoint.year)
    const nodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
      return { tableName, variableName, colName, value: undefined }
    })

    if (!Array.isArray(allNodes[originalDataPoint.countryIso])) {
      allNodes[originalDataPoint.countryIso] = []
    }

    allNodes[originalDataPoint.countryIso].push(...nodes)
  })

  await Promise.all(
    Object.entries(allNodes).map(async ([countryIso, nodes]: [CountryIso, NodeUpdate[]]) => {
      const nodeUpdates = { assessmentName, cycleName, countryIso, nodes }
      const propsDeps = { assessment, cycle, isODP: true, nodeUpdates, user }
      await scheduleUpdateDependencies(propsDeps)
    })
  )

  // 3. notifies client
  if (notifyClient) {
    const countryIsoColumns: Record<CountryIso, Array<string>> = {} as Record<CountryIso, Array<string>>
    originalDataPoints.map(async (originalDataPoint) => {
      const { countryIso, year } = originalDataPoint
      if (!Array.isArray(countryIsoColumns[countryIso])) {
        countryIsoColumns[originalDataPoint.countryIso] = []
      }
      countryIsoColumns[countryIso].push(String(year))
    })

    Object.entries(countryIsoColumns).map(async ([countryIso, colNames]: [CountryIso, Array<string>]) => {
      await notifyClientUpdate({
        cycle,
        sectionName,
        assessment,
        countryIso,
        colNames,
      })
    })
  }
}
