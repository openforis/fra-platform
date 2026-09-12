import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { User } from 'meta/user/user'

import { DataRedisRepository } from 'server/cache/repository/data'
import { getVariables } from 'server/controller/cycleData/nationalDataPoint/getVariables'
import { updateDependents } from 'server/controller/cycleData/tableData/updateDependencies/updateDependents'
import { BaseProtocol } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName?: string
  originalDataPoints: Array<OriginalDataPoint>
  user: User
}

export const updateOriginalDataPointsDependentNodes = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, country, cycle, originalDataPoints, sectionName, user } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso } = country

  originalDataPoints.forEach((originalDataPoint) => {
    if (!originalDataPoint.year) {
      throw new Error(`OriginalDataPoint ${originalDataPoint.id} is missing year`)
    }
  })

  // 1. update cache
  const tableName = TableNames.originalDataPointValue
  await DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true }, client)

  // 2. schedule dependencies update
  const nodes: Array<NodeUpdate> = []
  const originalDataPointVariables = getVariables({ cycle, sectionName })

  originalDataPoints.forEach((originalDataPoint) => {
    const colName = String(originalDataPoint.year)
    const opdNodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
      return { tableName, variableName, colName, value: undefined }
    })

    nodes.push(...opdNodes)
  })

  const nodeUpdates = { assessmentName, cycleName, countryIso, nodes }
  const propsDeps = { assessment, cycle, country, isODP: true, nodeUpdates, user }
  await updateDependents(propsDeps, client)
}
