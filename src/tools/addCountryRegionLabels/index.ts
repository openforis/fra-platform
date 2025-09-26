import '../scriptInit'

import { createI18nPromise } from 'i18n/i18nFactory'
import { TFunction } from 'i18next'
import * as pgPromise from 'pg-promise'
import { ITask } from 'pg-promise'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { CountryIso, RegionCode } from 'meta/area'
import { Lang, LanguageCodes } from 'meta/lang'

import { BaseProtocol, DB } from 'server/db'

const pgp = pgPromise()

const _getPublicCountryIsos = async (client: BaseProtocol = DB): Promise<Array<CountryIso>> => {
  return client.map(`select country_iso from public.country`, [], (row) => row.country_iso)
}

const _getPublicRegionCodes = async (client: BaseProtocol = DB): Promise<Array<RegionCode>> => {
  return client.map(`select region_code from public.region`, [], (row) => row.region_code)
}

const _updateDDL = async (): Promise<void> => {
  await Promise.all([
    DB.none(`alter table public.country add column if not exists labels jsonb not null default '{}'::jsonb`),
    DB.none(`alter table public.region add column if not exists labels jsonb not null default '{}'::jsonb`),
  ])
}

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

const _updateCountryTable = async (countryLabels: Array<CountryLabelUpdate>, client: ITask<unknown>): Promise<void> => {
  const cs = new pgp.helpers.ColumnSet(
    [
      { name: 'country_iso', prop: 'countryIso', cnd: true },
      { name: 'labels', cast: 'jsonb' },
    ],
    { table: { table: 'country', schema: 'public' } }
  )

  const query = `${pgp.helpers.update(countryLabels, cs)} where v.country_iso = t.country_iso`
  await client.none(query)
}

type RegionLabelUpdate = {
  regionCode: RegionCode
  labels: Record<Lang, string>
}

const _updateRegionTable = async (regionLabels: Array<RegionLabelUpdate>, client: ITask<unknown>): Promise<void> => {
  const cs = new pgp.helpers.ColumnSet(
    [
      { name: 'region_code', prop: 'regionCode', cnd: true },
      { name: 'labels', cast: 'jsonb' },
    ],
    { table: { table: 'region', schema: 'public' } }
  )

  const query = `${pgp.helpers.update(regionLabels, cs)} where v.region_code = t.region_code`
  await client.none(query)
}

const addCountryRegionLabels = async (): Promise<void> => {
  await _updateDDL()

  const [i18nInstances, countryIsos, regionCodes] = await Promise.all([
    _createI18nInstances(),
    _getPublicCountryIsos(),
    _getPublicRegionCodes(),
  ])

  const countryLabels: Array<CountryLabelUpdate> = countryIsos.map((countryIso) => {
    const labels = {} as Record<Lang, string>
    LanguageCodes.forEach((lang) => {
      labels[lang] = i18nInstances[lang].t(`area.${countryIso}.listName`)
    })
    return { countryIso, labels }
  })

  const regionLabels: Array<RegionLabelUpdate> = regionCodes.map((regionCode) => {
    const labels = {} as Record<Lang, string>
    LanguageCodes.forEach((lang) => {
      labels[lang] = i18nInstances[lang].t(`area.${regionCode}.listName`)
    })
    return { labels, regionCode }
  })

  await DB.tx(async (client) => {
    await _updateCountryTable(countryLabels, client)
    await _updateRegionTable(regionLabels, client)
  })
}

ToolsUtils.exec(addCountryRegionLabels)
