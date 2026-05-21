import '../scriptInit'

import path from 'node:path'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TotalLandAreaUpdateData, updateTotalLandArea } from 'tools/faostat/updateTotalLandArea'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

// Usage:
// Simply download the csv from fao stat, rename it to FAOSTAT_data.csv and add it to ./csv/
// https://www.fao.org/faostat/en/#data/RL
// Run: npx ts-node src/tools/faostat/import.ts <cycleName>
// Example: npx ts-node src/tools/faostat/import.ts 2025

const __FILENAME__ = 'FAOSTAT_data.csv'
const __LAST_YEAR__ = new Date().getFullYear()

const assessmentName = 'fra'
const cycleName = process.argv[2]
if (!cycleName) throw new Error('cycleName is required. Usage: import.ts <cycleName>')

/**
 * All columns:
 * Domain Code, Domain, Area Code (M49), Area, Element Code, Element, Item Code, Item, Year Code, Year, Unit, Value, Flag, Flag Description, Note
 */
type FAOSTATRow = {
  'Area Code (M49)': string
  Year: string
  Value: string
}

// Return map [m49, country iso]
const _buildM49Map = (assessment: Assessment, cycle: Cycle): Promise<Map<string, CountryIso>> =>
  AreaController.getCountries({ assessment, cycle }, DB).then((countries) =>
    countries.reduce<Map<string, CountryIso>>((acc, country) => {
      acc.set(country.m49, country.countryIso)
      return acc
    }, new Map())
  )

const _buildData = (rows: Array<FAOSTATRow>, m49Map: Map<string, CountryIso>): TotalLandAreaUpdateData => {
  const data = rows.reduce<TotalLandAreaUpdateData>((acc, row) => {
    const m49 = row['Area Code (M49)']
    const countryIso = m49Map.get(m49)
    if (!countryIso) {
      Logger.info(`** No country iso found for m49 code: ${m49} **`)
      return acc
    }

    if (!acc[countryIso]) acc[countryIso] = []
    acc[countryIso].push({ year: row.Year, value: row.Value })
    return acc
  }, {})

  // Fill rest of the years until __LAST_YEAR__
  // E.g. FAOSTAT has data until 2023, __LAST_YEAR__ = 2025
  // Fill 2024 and 2025 with FAOSTAT 2023
  Object.values(data).forEach((entries) => {
    const lastEntry = entries.at(-1)
    const lastFaostatYear = Number(lastEntry.year)
    for (let year = lastFaostatYear + 1; year <= __LAST_YEAR__; year += 1) {
      entries.push({ year: String(year), value: lastEntry.value })
    }
  })

  return data
}

ToolsUtils.exec(async () => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName,
    cycleName,
    metaCache: true,
  })

  const csvPath = path.join(__dirname, 'csv', __FILENAME__)
  const [rows, m49Map] = await Promise.all([CSV.read<FAOSTATRow>(csvPath), _buildM49Map(assessment, cycle)])
  const data = _buildData(rows, m49Map)

  await DB.tx(async (client) => {
    const user = await UserController.getUserRobot(client)
    await updateTotalLandArea({ assessment, cycle, data, user }, client)
  })
})
