import { updateDependencies } from 'tools/migrations/steps/steps/utils/updateDependencies'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdate } from 'meta/data'

import { getOriginalDataPointVariables } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { BaseProtocol, DB, Schemas } from 'server/db'

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
    countryNodes[countryIso] = []

    const colName = String(year)
    const opdNodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
      return { tableName, variableName, colName, value: undefined }
    })
    countryNodes[countryIso].push(...opdNodes)
  })

  await updateDependencies({
    assessment,
    cycle,
    isODP: true,
    countryNodes,
  })
}
