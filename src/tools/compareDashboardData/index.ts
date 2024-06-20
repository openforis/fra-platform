import 'tsconfig-paths/register'
import 'dotenv/config'

import { getData } from 'tools/compareDashboardData/getData'

import { RegionCode } from 'meta/area'

import { Logger } from 'server/utils/logger'

const exec = async () => {
  const { prod } = await getData(RegionCode.EU)
  console.log(JSON.stringify(prod, null, 2))

  // TODO:
  // Generate array of object with CSV headers, eg { areaCode: EU, variableName: forestArea, ... }
  // Write CSV
  // CSV:
  // [AreaCode] [VariableName] [Column] [value_prod] [value_local] [diff]
}

const start = new Date().getTime()
Logger.debug(`========== START COMPARE TABLE DATA ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  process.exit(0)
})
