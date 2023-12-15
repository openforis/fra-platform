import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { getOriginalDataPointVariables } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { isAtlantisAllowed } from 'server/repository/assessmentCycle/country/isAtlantisAllowed'

import { updateDependencies } from './updateDependencies'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const updateODPDependencies = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props
  const countryNodes: Record<CountryIso, Array<NodeUpdate>> = {} as Record<CountryIso, Array<NodeUpdate>>

  const originalDataPointVariables = getOriginalDataPointVariables({ cycle })

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const originalDataPoints = await client.map<{ countryIso: CountryIso; year: number }>(
    `
        select country_iso, year
        from ${schemaCycle}.original_data_point
        where jsonb_array_length(national_classes) > 0
  `,
    [],
    (res) => Objects.camelize(res)
  )

  originalDataPoints.forEach(({ countryIso, year }) => {
    if (!countryIso.startsWith('X') || isAtlantisAllowed(assessment, cycle)) {
      countryNodes[countryIso] = []

      const colName = String(year)
      const opdNodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
        return { tableName, variableName, colName, value: undefined }
      })
      countryNodes[countryIso].push(...opdNodes)
    }
  })

  await updateDependencies({
    assessment,
    cycle,
    isODP: true,
    countryNodes,
  })
}
