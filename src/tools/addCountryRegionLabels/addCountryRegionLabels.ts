import { i18n } from 'i18next'
import pgPromise from 'pg-promise'

import { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'
import { SubregionCode } from 'meta/area/subregionCode'
import { Lang, LanguageCodes } from 'meta/lang'
import { Promises } from 'utils/promises'
import { Strings } from 'utils/strings'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { I18n } from 'server/utils'

const pgp = pgPromise()

const _getLocale = (isoCode: string): string => {
  if (isoCode.includes('zh')) return 'zh-CN'
  return isoCode
}

const _getListName = (isoCode: string, i18n: i18n): string => i18n.t(`area.${isoCode}.listName`)

type CompareFn = (isoCode1: string, isoCode2: string) => number

const _getCompareListNameByIsoCode =
  (i18n: i18n): CompareFn =>
  (isoCode1: string, isoCode2: string): number => {
    const country1 = Strings.normalize(_getListName(isoCode1, i18n))
    const country2 = Strings.normalize(_getListName(isoCode2, i18n))
    const locale = _getLocale(i18n.resolvedLanguage)
    return country1.localeCompare(country2, locale)
  }

type I18nInstances = Record<Lang, { compareListName: CompareFn }>

const _createI18nInstances = async (): Promise<I18nInstances> => {
  const entries = await Promise.all(
    LanguageCodes.map(async (lang) => {
      const i18nInstance = await I18n.get({ lang })
      const compareListName = _getCompareListNameByIsoCode(i18nInstance)
      return [lang, { compareListName }] as const
    })
  )

  return Object.fromEntries(entries) as I18nInstances
}

type SortIndex = Record<Lang, number>

const _buildSortIndexes = (codes: Array<string>, i18nInstances: I18nInstances): Record<string, SortIndex> => {
  const sortIndexes: Record<string, SortIndex> = {}

  codes.forEach((code) => {
    sortIndexes[code] = {} as SortIndex
  })

  LanguageCodes.forEach((lang) => {
    const { compareListName } = i18nInstances[lang]
    const sortedCodes = Array.from(codes).sort((codeA, codeB) => compareListName(codeA, codeB))

    sortedCodes.forEach((code, index) => {
      sortIndexes[code][lang] = index
    })
  })

  return sortIndexes
}

type CountrySortIndexUpdate = {
  countryIso: CountryIso
  sortIndex: SortIndex
}

const getCountrySortIndexes = async (
  i18nInstances: I18nInstances,
  client: BaseProtocol = DB
): Promise<Array<CountrySortIndexUpdate>> => {
  const countryIsos = await client.map(`select country_iso from public.country`, [], (row) => row.country_iso)
  const sortIndexes = _buildSortIndexes(countryIsos, i18nInstances)

  return countryIsos.map((countryIso) => ({
    countryIso,
    sortIndex: sortIndexes[countryIso],
  }))
}

type RegionSortIndexUpdate = {
  regionCode: RegionCode | SubregionCode
  sortIndex: SortIndex
}

const getRegionSortIndexes = async (
  i18nInstances: I18nInstances,
  client: BaseProtocol = DB
): Promise<Array<RegionSortIndexUpdate>> => {
  const regionCodes = await client.map(`select region_code from public.region`, [], (row) => row.region_code)
  const sortIndexes = _buildSortIndexes(regionCodes, i18nInstances)

  return regionCodes.map((regionCode) => ({
    regionCode,
    sortIndex: sortIndexes[regionCode],
  }))
}

type UpdateProps = {
  countrySortIndexes: Array<CountrySortIndexUpdate>
  regionSortIndexes: Array<RegionSortIndexUpdate>
}

const _updateCountryRegionSortIndexes = async (props: UpdateProps, client: BaseProtocol): Promise<void> => {
  const { countrySortIndexes, regionSortIndexes } = props

  const schema = 'public'

  const countryCS = new pgp.helpers.ColumnSet(
    [
      { name: 'country_iso', prop: 'countryIso', cnd: true },
      { name: 'sort_index', prop: 'sortIndex', cast: 'jsonb' },
    ],
    { table: { table: 'country', schema } }
  )

  const countryQuery = `${pgp.helpers.update(countrySortIndexes, countryCS)} where v.country_iso = t.country_iso`

  const regionCS = new pgp.helpers.ColumnSet(
    [
      { name: 'region_code', prop: 'regionCode', cnd: true },
      { name: 'sort_index', prop: 'sortIndex', cast: 'jsonb' },
    ],
    { table: { table: 'region', schema } }
  )

  const regionQuery = `${pgp.helpers.update(regionSortIndexes, regionCS)} where v.region_code = t.region_code`

  await Promise.all([client.none(countryQuery), client.none(regionQuery)])
}

export const addCountryRegionLabels = async (client: BaseProtocol = DB): Promise<void> => {
  const i18nInstances = await _createI18nInstances()

  const [countrySortIndexes, regionSortIndexes, assessments] = await Promise.all([
    getCountrySortIndexes(i18nInstances, client),
    getRegionSortIndexes(i18nInstances, client),
    AssessmentController.getAll({}, client),
  ])

  // update public
  await _updateCountryRegionSortIndexes({ countrySortIndexes, regionSortIndexes }, client)

  const allCycles = assessments.flatMap((assessment) => assessment.cycles.map((cycle) => ({ assessment, cycle })))

  // update cache
  await Promises.each(allCycles, async ({ assessment, cycle }) => {
    await CacheController.generateArea({ assessment, cycle }, client)
  })
}
