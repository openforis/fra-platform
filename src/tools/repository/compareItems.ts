import 'tsconfig-paths/register'
import 'dotenv/config'

import assert from 'assert'
import axios from 'axios'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'
import { APIUtil } from 'tools/utils/API'
import { cookies } from 'tools/utils/API/cookie'
import { CSV } from 'tools/utils/CSV'

import { Logger } from 'server/utils/logger'

const localAPI = axios.create({ headers: { cookie: cookies.local } })

const target = 'https://fra-data.fao.org'
const source = 'http://localhost:9000'

const assessmentName = 'fra'
const cycleName = 'latest'
const ALL_CYCLES = ['2020', '2025', 'latest']
// use --csv flag to write to file
const WRITE_TO_CSV = process.argv.includes('--csv')
// use --countryIso=FIN to test only a specific country
// Top countries:
//  country_iso | items
//      -------------+-------
//       IDN         |    97
//       MUS         |    24
//       BIH         |    23
//       URY         |    22
//       BEN         |    20
//       COD         |    18
//       PER         |    18
//       MDG         |    18
//       MNG         |    18
//       SPM         |    17
//       GAB         |    17
//       MKD         |    16
//       AGO         |    16
//       HTI         |    15
//       MRT         |    15
const COUNTRY_ISO = process.argv.find((arg) => arg.startsWith('--countryIso='))?.split('=')[1] as CountryIso | undefined

type Difference = {
  label: string
  sourceItems: Array<RepositoryItem>
  targetItems: Array<RepositoryItem>
}

const differences: Array<Difference> = []

const sortKey = (item: RepositoryItem): string => item.fileUuid ?? item.link ?? ''
const sort = (items: Array<RepositoryItem>): Array<RepositoryItem> =>
  [...items].sort((a, b) => (sortKey(a) > sortKey(b) ? 1 : -1))
const normalize = ({ countryIso, fileUuid, link, props }: RepositoryItem): Partial<RepositoryItem> => ({
  countryIso,
  fileUuid,
  link,
  props,
})

// fetch all cycles from target and deduplicate to match new repository
// global: dedup by link ?? translation
// country: dedup by fileUuid ?? uuid
const getTargetItems = async (countryIso: CountryIso, global: boolean): Promise<Array<RepositoryItem>> => {
  const perCycle = await Promise.all(
    ALL_CYCLES.map((cn) =>
      APIUtil.getRepositoryItems({ source: target, assessmentName, cycleName: cn, countryIso, global })
    )
  )
  const dedupKey = global
    ? (item: RepositoryItem): string => item.link ?? item.props?.translation?.en ?? item.uuid
    : (item: RepositoryItem): string => item.fileUuid ?? item.uuid
  const acc = new Map<string, RepositoryItem>()
  perCycle.flat().forEach((item) => acc.set(dedupKey(item), item))
  return [...acc.values()]
}

const compare = async (countryIso: CountryIso, global: boolean): Promise<void> => {
  const label = global ? `${countryIso} global` : countryIso

  const [sourceItems, targetItems] = await Promise.all([
    APIUtil.getRepositoryItems({ api: localAPI, source, assessmentName, cycleName, countryIso, global }),
    getTargetItems(countryIso, global),
  ])

  try {
    assert.deepStrictEqual(sort(sourceItems).map(normalize), sort(targetItems).map(normalize))
  } catch {
    Logger.debug(`NOK: ${assessmentName} ${cycleName} ${label}`)
    differences.push({
      label,
      sourceItems: sort(sourceItems).map(normalize) as Array<RepositoryItem>,
      targetItems: sort(targetItems).map(normalize) as Array<RepositoryItem>,
    })
  }
}

// write to csv only if --csv
const _writeToCSV = async (): Promise<void> => {
  // flatten objects and merge - used to print same columns next to each other in csv
  const _toRow = (
    label: string,
    i: number,
    source: RepositoryItem,
    target: RepositoryItem
  ): Record<string, unknown> => {
    const sourceFlat = Objects.flatten(source)
    const targetFlat = Objects.flatten(target)
    const keys = new Set([...Object.keys(sourceFlat), ...Object.keys(targetFlat)])
    const zipped = [...keys].reduce<Record<string, unknown>>((acc, key) => {
      acc[`${key}_source`] = sourceFlat[key]
      acc[`${key}_target`] = targetFlat[key]
      return acc
    }, {})
    return { label, i, ...zipped }
  }

  const rows = differences.flatMap((diff) =>
    diff.sourceItems.reduce<Array<ReturnType<typeof _toRow>>>((acc, sourceItem, i) => {
      const targetItem = diff.targetItems[i] ?? ({} as RepositoryItem)
      if (JSON.stringify(sourceItem) !== JSON.stringify(targetItem))
        acc.push(_toRow(diff.label, i, sourceItem, targetItem))
      return acc
    }, [])
  )
  await CSV.write(rows, `compare-repository-${assessmentName}-${cycleName}`)
}

const exec = async (): Promise<void> => {
  const { countries } = await APIUtil.getCountries({ source: target, assessmentName, cycleName })

  if (!COUNTRY_ISO) Logger.info('compare single country with --countryIso=ISO flag')

  const filtered = COUNTRY_ISO ? countries.filter((c) => c.countryIso === COUNTRY_ISO) : countries

  if (!WRITE_TO_CSV) Logger.info('write to csv using --csv flag')

  await Promise.all(
    filtered.flatMap((country) => [compare(country.countryIso, false), compare(country.countryIso, true)])
  )

  if (differences.length) {
    if (WRITE_TO_CSV) await _writeToCSV()
    process.exit(1)
  }
}

const start = new Date().getTime()
Logger.debug(`========== START COMPARE REPOSITORY ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  process.exit(0)
})
