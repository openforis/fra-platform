import { createI18nPromise } from 'i18n/i18nFactory'
import { TFunction } from 'i18next'
import * as pgPromise from 'pg-promise'
import { Promises } from 'utils/promises'

import { CountryIso, RegionCode } from 'meta/area'
import { Lang, LanguageCodes } from 'meta/lang'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'

const pgp = pgPromise()

type I18nInstances = Record<Lang, { language: Lang; t: TFunction }>

const _createI18nInstances = async (): Promise<I18nInstances> => {
  const entries = await Promise.all(
    LanguageCodes.map(async (lang) => {
      const i18n = await createI18nPromise(lang)
      return [lang, i18n] as const
    })
  )

  return Object.fromEntries(entries) as I18nInstances
}

type CountryLabelUpdate = {
  countryIso: CountryIso
  labels: Record<Lang, string>
}

const getCountryLabels = async (
  i18nInstances: I18nInstances,
  client: BaseProtocol = DB
): Promise<Array<CountryLabelUpdate>> => {
  const countryIsos = await client.map(`select country_iso from public.country`, [], (row) => row.country_iso)

  const countryLabels = countryIsos.map((countryIso) => {
    const labels = {} as Record<Lang, string>
    LanguageCodes.forEach((lang) => {
      labels[lang] = i18nInstances[lang].t(`area.${countryIso}.listName`)
    })
    return { countryIso, labels }
  })

  return countryLabels
}

type RegionLabelUpdate = {
  labels: Record<Lang, string>
  regionCode: RegionCode
}

const getRegionLabels = async (
  i18nInstances: I18nInstances,
  client: BaseProtocol = DB
): Promise<Array<RegionLabelUpdate>> => {
  const regionCodes = await client.map(`select region_code from public.region`, [], (row) => row.region_code)

  const regionLabels = regionCodes.map((regionCode) => {
    const labels = {} as Record<Lang, string>
    LanguageCodes.forEach((lang) => {
      labels[lang] = i18nInstances[lang].t(`area.${regionCode}.listName`)
    })
    return { labels, regionCode }
  })

  return regionLabels
}

type UpdateProps = { countryLabels: Array<CountryLabelUpdate>; regionLabels: Array<RegionLabelUpdate>; schema: string }

const _updateCountryRegionLabels = async (props: UpdateProps, client: BaseProtocol): Promise<void> => {
  const { countryLabels, regionLabels, schema } = props
  const countryCS = new pgp.helpers.ColumnSet(
    [
      { name: 'country_iso', prop: 'countryIso', cnd: true },
      { name: 'labels', cast: 'jsonb' },
    ],
    { table: { table: 'country', schema } }
  )

  const countryQuery = `${pgp.helpers.update(countryLabels, countryCS)} where v.country_iso = t.country_iso`

  const regionCS = new pgp.helpers.ColumnSet(
    [
      { name: 'region_code', prop: 'regionCode', cnd: true },
      { name: 'labels', cast: 'jsonb' },
    ],
    { table: { table: 'region', schema } }
  )

  const regionQuery = `${pgp.helpers.update(regionLabels, regionCS)} where v.region_code = t.region_code`

  await Promise.all([client.none(countryQuery), client.none(regionQuery)])
}

export const addCountryRegionLabels = async (client: BaseProtocol = DB): Promise<void> => {
  const i18nInstances = await _createI18nInstances()

  const [countryLabels, regionLabels, assessments] = await Promise.all([
    getCountryLabels(i18nInstances, client),
    getRegionLabels(i18nInstances, client),
    AssessmentController.getAll({}, client),
  ])

  // update public
  await _updateCountryRegionLabels({ countryLabels, regionLabels, schema: 'public' }, client)

  const allCycles = assessments.flatMap((assessment) => assessment.cycles.map((cycle) => ({ assessment, cycle })))

  // update cycles
  await Promise.all(
    allCycles.map(async ({ assessment, cycle }) => {
      const schema = Schemas.getNameCycle(assessment, cycle)
      return _updateCountryRegionLabels({ countryLabels, regionLabels, schema }, client)
    })
  )

  // update cache
  await Promises.each(allCycles, async ({ assessment, cycle }) => {
    await CacheController.generateArea({ assessment, cycle }, client)
  })
}
