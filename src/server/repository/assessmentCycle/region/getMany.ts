import { Global, RegionCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { isAtlantisAllowed } from 'server/repository/assessmentCycle/country/isAtlantisAllowed'

export const getMany = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<(Global.WO | RegionCode)[]> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let atlantis = ''

  if (!isAtlantisAllowed(assessment, cycle)) {
    atlantis = `where r.region_code != '${RegionCode.AT}'`
  }

  const regionCodes = await client.map<RegionCode>(
    `select region_code from ${schemaCycle}.region r ${atlantis}`,
    [],
    // eslint-disable-next-line camelcase
    ({ region_code }) => region_code
  )

  return [Global.WO, ...regionCodes]
}
