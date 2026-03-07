import pgPromise from 'pg-promise'

import type { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'
import { SubRegionCode } from 'meta/area/subRegionCode'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Promises } from 'utils/promises'
import { addCountryRegionLabels } from 'tools/addCountryRegionLabels/addCountryRegionLabels'

import { BaseProtocol } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { Schemas } from 'server/db/schemas'

const pgp = pgPromise()

type CountrySubregion = {
  countryIso: CountryIso
  regionCode: SubRegionCode
}

type Subregion = {
  name: string
  parentCode: RegionCode
  regionCode: SubRegionCode
}

const countrySubregions: Array<CountrySubregion> = [
  { countryIso: 'AFG', regionCode: SubRegionCode.WCA },
  { countryIso: 'DZA', regionCode: SubRegionCode.NAF },
  { countryIso: 'AGO', regionCode: SubRegionCode.ESA },
  { countryIso: 'AIA', regionCode: SubRegionCode.CAR },
  { countryIso: 'ATG', regionCode: SubRegionCode.CAR },
  { countryIso: 'ARM', regionCode: SubRegionCode.WCA },
  { countryIso: 'ABW', regionCode: SubRegionCode.CAR },
  { countryIso: 'AZE', regionCode: SubRegionCode.WCA },
  { countryIso: 'BHS', regionCode: SubRegionCode.CAR },
  { countryIso: 'BHR', regionCode: SubRegionCode.WCA },
  { countryIso: 'BGD', regionCode: SubRegionCode.SSE },
  { countryIso: 'BRB', regionCode: SubRegionCode.CAR },
  { countryIso: 'BLZ', regionCode: SubRegionCode.CAM },
  { countryIso: 'BEN', regionCode: SubRegionCode.WAF },
  { countryIso: 'BMU', regionCode: SubRegionCode.CAR },
  { countryIso: 'BTN', regionCode: SubRegionCode.SSE },
  { countryIso: 'BES', regionCode: SubRegionCode.CAR },
  { countryIso: 'BWA', regionCode: SubRegionCode.ESA },
  { countryIso: 'VGB', regionCode: SubRegionCode.CAR },
  { countryIso: 'BRN', regionCode: SubRegionCode.SSE },
  { countryIso: 'BFA', regionCode: SubRegionCode.WAF },
  { countryIso: 'BDI', regionCode: SubRegionCode.WAF },
  { countryIso: 'KHM', regionCode: SubRegionCode.SSE },
  { countryIso: 'CMR', regionCode: SubRegionCode.WAF },
  { countryIso: 'CAN', regionCode: SubRegionCode.NOA },
  { countryIso: 'CPV', regionCode: SubRegionCode.WAF },
  { countryIso: 'CYM', regionCode: SubRegionCode.CAR },
  { countryIso: 'CAF', regionCode: SubRegionCode.WAF },
  { countryIso: 'TCD', regionCode: SubRegionCode.WAF },
  { countryIso: 'CHN', regionCode: SubRegionCode.EAS },
  { countryIso: 'COM', regionCode: SubRegionCode.ESA },
  { countryIso: 'COG', regionCode: SubRegionCode.WAF },
  { countryIso: 'CRI', regionCode: SubRegionCode.CAM },
  { countryIso: 'CIV', regionCode: SubRegionCode.WAF },
  { countryIso: 'CUB', regionCode: SubRegionCode.CAR },
  { countryIso: 'CUW', regionCode: SubRegionCode.CAR },
  { countryIso: 'CYP', regionCode: SubRegionCode.WCA },
  { countryIso: 'PRK', regionCode: SubRegionCode.EAS },
  { countryIso: 'COD', regionCode: SubRegionCode.WAF },
  { countryIso: 'DJI', regionCode: SubRegionCode.ESA },
  { countryIso: 'DMA', regionCode: SubRegionCode.CAR },
  { countryIso: 'DOM', regionCode: SubRegionCode.CAR },
  { countryIso: 'EGY', regionCode: SubRegionCode.NAF },
  { countryIso: 'SLV', regionCode: SubRegionCode.CAM },
  { countryIso: 'GNQ', regionCode: SubRegionCode.WAF },
  { countryIso: 'ERI', regionCode: SubRegionCode.ESA },
  { countryIso: 'ETH', regionCode: SubRegionCode.ESA },
  { countryIso: 'GAB', regionCode: SubRegionCode.WAF },
  { countryIso: 'GMB', regionCode: SubRegionCode.WAF },
  { countryIso: 'GEO', regionCode: SubRegionCode.WCA },
  { countryIso: 'GHA', regionCode: SubRegionCode.WAF },
  { countryIso: 'GRL', regionCode: SubRegionCode.NOA },
  { countryIso: 'GRD', regionCode: SubRegionCode.CAR },
  { countryIso: 'GLP', regionCode: SubRegionCode.CAR },
  { countryIso: 'GTM', regionCode: SubRegionCode.CAM },
  { countryIso: 'GIN', regionCode: SubRegionCode.WAF },
  { countryIso: 'GNB', regionCode: SubRegionCode.WAF },
  { countryIso: 'HTI', regionCode: SubRegionCode.CAR },
  { countryIso: 'HND', regionCode: SubRegionCode.CAM },
  { countryIso: 'IND', regionCode: SubRegionCode.SSE },
  { countryIso: 'IDN', regionCode: SubRegionCode.SSE },
  { countryIso: 'IRN', regionCode: SubRegionCode.WCA },
  { countryIso: 'IRQ', regionCode: SubRegionCode.WCA },
  { countryIso: 'ISR', regionCode: SubRegionCode.WCA },
  { countryIso: 'JAM', regionCode: SubRegionCode.CAR },
  { countryIso: 'JPN', regionCode: SubRegionCode.EAS },
  { countryIso: 'JOR', regionCode: SubRegionCode.WCA },
  { countryIso: 'KAZ', regionCode: SubRegionCode.WCA },
  { countryIso: 'KEN', regionCode: SubRegionCode.ESA },
  { countryIso: 'KWT', regionCode: SubRegionCode.WCA },
  { countryIso: 'KGZ', regionCode: SubRegionCode.WCA },
  { countryIso: 'LAO', regionCode: SubRegionCode.SSE },
  { countryIso: 'LBN', regionCode: SubRegionCode.WCA },
  { countryIso: 'LSO', regionCode: SubRegionCode.ESA },
  { countryIso: 'LBR', regionCode: SubRegionCode.WAF },
  { countryIso: 'LBY', regionCode: SubRegionCode.NAF },
  { countryIso: 'MDG', regionCode: SubRegionCode.ESA },
  { countryIso: 'MWI', regionCode: SubRegionCode.ESA },
  { countryIso: 'MYS', regionCode: SubRegionCode.SSE },
  { countryIso: 'MDV', regionCode: SubRegionCode.SSE },
  { countryIso: 'MLI', regionCode: SubRegionCode.WAF },
  { countryIso: 'MTQ', regionCode: SubRegionCode.CAR },
  { countryIso: 'MRT', regionCode: SubRegionCode.NAF },
  { countryIso: 'MUS', regionCode: SubRegionCode.ESA },
  { countryIso: 'MYT', regionCode: SubRegionCode.ESA },
  { countryIso: 'MEX', regionCode: SubRegionCode.NOA },
  { countryIso: 'MNG', regionCode: SubRegionCode.EAS },
  { countryIso: 'MSR', regionCode: SubRegionCode.CAR },
  { countryIso: 'MAR', regionCode: SubRegionCode.NAF },
  { countryIso: 'MOZ', regionCode: SubRegionCode.ESA },
  { countryIso: 'MMR', regionCode: SubRegionCode.SSE },
  { countryIso: 'NAM', regionCode: SubRegionCode.ESA },
  { countryIso: 'NPL', regionCode: SubRegionCode.SSE },
  { countryIso: 'NIC', regionCode: SubRegionCode.CAM },
  { countryIso: 'NER', regionCode: SubRegionCode.WAF },
  { countryIso: 'NGA', regionCode: SubRegionCode.WAF },
  { countryIso: 'PSE', regionCode: SubRegionCode.WCA },
  { countryIso: 'OMN', regionCode: SubRegionCode.WCA },
  { countryIso: 'PAK', regionCode: SubRegionCode.SSE },
  { countryIso: 'PAN', regionCode: SubRegionCode.CAM },
  { countryIso: 'PHL', regionCode: SubRegionCode.SSE },
  { countryIso: 'PRI', regionCode: SubRegionCode.CAR },
  { countryIso: 'QAT', regionCode: SubRegionCode.WCA },
  { countryIso: 'KOR', regionCode: SubRegionCode.EAS },
  { countryIso: 'REU', regionCode: SubRegionCode.ESA },
  { countryIso: 'RWA', regionCode: SubRegionCode.WAF },
  { countryIso: 'SHN', regionCode: SubRegionCode.WAF },
  { countryIso: 'KNA', regionCode: SubRegionCode.CAR },
  { countryIso: 'LCA', regionCode: SubRegionCode.CAR },
  { countryIso: 'MAF', regionCode: SubRegionCode.CAR },
  { countryIso: 'SPM', regionCode: SubRegionCode.NOA },
  { countryIso: 'VCT', regionCode: SubRegionCode.CAR },
  { countryIso: 'BLM', regionCode: SubRegionCode.CAR },
  { countryIso: 'STP', regionCode: SubRegionCode.WAF },
  { countryIso: 'SAU', regionCode: SubRegionCode.WCA },
  { countryIso: 'SEN', regionCode: SubRegionCode.WAF },
  { countryIso: 'SYC', regionCode: SubRegionCode.ESA },
  { countryIso: 'SLE', regionCode: SubRegionCode.WAF },
  { countryIso: 'SGP', regionCode: SubRegionCode.SSE },
  { countryIso: 'SXM', regionCode: SubRegionCode.CAR },
  { countryIso: 'SOM', regionCode: SubRegionCode.ESA },
  { countryIso: 'ZAF', regionCode: SubRegionCode.ESA },
  { countryIso: 'SSD', regionCode: SubRegionCode.NAF },
  { countryIso: 'LKA', regionCode: SubRegionCode.SSE },
  { countryIso: 'SDN', regionCode: SubRegionCode.NAF },
  { countryIso: 'SWZ', regionCode: SubRegionCode.ESA },
  { countryIso: 'SYR', regionCode: SubRegionCode.WCA },
  { countryIso: 'TJK', regionCode: SubRegionCode.WCA },
  { countryIso: 'THA', regionCode: SubRegionCode.SSE },
  { countryIso: 'TLS', regionCode: SubRegionCode.SSE },
  { countryIso: 'TGO', regionCode: SubRegionCode.WAF },
  { countryIso: 'TTO', regionCode: SubRegionCode.CAR },
  { countryIso: 'TUN', regionCode: SubRegionCode.NAF },
  { countryIso: 'TUR', regionCode: SubRegionCode.WCA },
  { countryIso: 'TKM', regionCode: SubRegionCode.WCA },
  { countryIso: 'TCA', regionCode: SubRegionCode.CAR },
  { countryIso: 'UGA', regionCode: SubRegionCode.ESA },
  { countryIso: 'ARE', regionCode: SubRegionCode.WCA },
  { countryIso: 'TZA', regionCode: SubRegionCode.ESA },
  { countryIso: 'USA', regionCode: SubRegionCode.NOA },
  { countryIso: 'VIR', regionCode: SubRegionCode.CAR },
  { countryIso: 'UZB', regionCode: SubRegionCode.WCA },
  { countryIso: 'VNM', regionCode: SubRegionCode.SSE },
  { countryIso: 'ESH', regionCode: SubRegionCode.NAF },
  { countryIso: 'YEM', regionCode: SubRegionCode.WCA },
  { countryIso: 'ZMB', regionCode: SubRegionCode.ESA },
  { countryIso: 'ZWE', regionCode: SubRegionCode.ESA },
]

const subregions: Array<Subregion> = [
  {
    regionCode: SubRegionCode.ESA,
    name: 'eastern_and_southern_africa',
    parentCode: RegionCode.AF,
  },
  {
    regionCode: SubRegionCode.NAF,
    name: 'northern_africa',
    parentCode: RegionCode.AF,
  },
  {
    regionCode: SubRegionCode.WAF,
    name: 'western_and_central_africa',
    parentCode: RegionCode.AF,
  },
  {
    regionCode: SubRegionCode.EAS,
    name: 'east_asia',
    parentCode: RegionCode.AS,
  },
  {
    regionCode: SubRegionCode.SSE,
    name: 'south_and_southeast_asia',
    parentCode: RegionCode.AS,
  },
  {
    regionCode: SubRegionCode.WCA,
    name: 'western_and_central_asia',
    parentCode: RegionCode.AS,
  },
  {
    regionCode: SubRegionCode.CAM,
    name: 'central_america',
    parentCode: RegionCode.NA,
  },
  {
    regionCode: SubRegionCode.CAR,
    name: 'caribbean',
    parentCode: RegionCode.NA,
  },
  {
    regionCode: SubRegionCode.NOA,
    name: 'north_america',
    parentCode: RegionCode.NA,
  },
]

const _updatePublicRegionDDL = async (client: BaseProtocol): Promise<void> => {
  await client.none(`
    alter table public.region
      add column if not exists parent_code text references public.region (region_code) on update cascade on delete cascade;
  `)
}

const _upsertSubregions = async (client: BaseProtocol): Promise<void> => {
  const columnSet = new pgp.helpers.ColumnSet(
    [
      { name: 'region_code', prop: 'regionCode' },
      { name: 'name', prop: 'name' },
      { name: 'parent_code', prop: 'parentCode' },
    ],
    { table: { schema: 'public', table: 'region' } }
  )

  const query = `
    ${pgp.helpers.insert(subregions, columnSet)}
    on conflict (region_code) do update
    set
      name = excluded.name,
      parent_code = excluded.parent_code
  `

  await client.none(query)
}

const _insertCountrySubregions = async (
  props: { countrySubregions: Array<CountrySubregion>; schemaCycle: string },
  client: BaseProtocol
): Promise<void> => {
  const { countrySubregions, schemaCycle } = props
  if (countrySubregions.length === 0) return

  const valuesColumnSet = new pgp.helpers.ColumnSet(
    [
      { name: 'country_iso', prop: 'countryIso' },
      { name: 'region_code', prop: 'regionCode' },
    ],
    { table: 'v' }
  )

  const query = `
    insert into ${schemaCycle}.country_region (country_iso, region_code)
    select v.country_iso, v.region_code
    from (values ${pgp.helpers.values(countrySubregions, valuesColumnSet)}) as v(country_iso, region_code)
             join ${schemaCycle}.country c on c.country_iso = v.country_iso
             join public.region r on r.region_code = v.region_code
    on conflict (country_iso, region_code) do nothing
  `

  await client.none(query)
}

export default async (client: BaseProtocol): Promise<void> => {
  await _updatePublicRegionDDL(client)
  await _upsertSubregions(client)

  const assessment = await AssessmentRepository.getOne({ assessmentName: AssessmentNames.fra }, client)

  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    await _insertCountrySubregions({ countrySubregions, schemaCycle }, client)
  })

  await addCountryRegionLabels(client)
}
