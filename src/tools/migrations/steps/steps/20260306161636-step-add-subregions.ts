import pgPromise from 'pg-promise'

import type { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'
import { SubregionCode } from 'meta/area/subregionCode'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Promises } from 'utils/promises'
import { addCountryRegionLabels } from 'tools/addCountryRegionLabels/addCountryRegionLabels'

import { BaseProtocol } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { Schemas } from 'server/db/schemas'

const pgp = pgPromise()

type CountrySubregion = {
  countryIso: CountryIso
  regionCode: SubregionCode
}

type Subregion = {
  name: string
  parentCode: RegionCode
  regionCode: SubregionCode
}

const countrySubregions: Array<CountrySubregion> = [
  { countryIso: 'AFG', regionCode: SubregionCode.WCA },
  { countryIso: 'DZA', regionCode: SubregionCode.NAF },
  { countryIso: 'AGO', regionCode: SubregionCode.ESA },
  { countryIso: 'AIA', regionCode: SubregionCode.CAR },
  { countryIso: 'ATG', regionCode: SubregionCode.CAR },
  { countryIso: 'ARM', regionCode: SubregionCode.WCA },
  { countryIso: 'ABW', regionCode: SubregionCode.CAR },
  { countryIso: 'AZE', regionCode: SubregionCode.WCA },
  { countryIso: 'BHS', regionCode: SubregionCode.CAR },
  { countryIso: 'BHR', regionCode: SubregionCode.WCA },
  { countryIso: 'BGD', regionCode: SubregionCode.SSE },
  { countryIso: 'BRB', regionCode: SubregionCode.CAR },
  { countryIso: 'BLZ', regionCode: SubregionCode.CAM },
  { countryIso: 'BEN', regionCode: SubregionCode.WAF },
  { countryIso: 'BMU', regionCode: SubregionCode.CAR },
  { countryIso: 'BTN', regionCode: SubregionCode.SSE },
  { countryIso: 'BES', regionCode: SubregionCode.CAR },
  { countryIso: 'BWA', regionCode: SubregionCode.ESA },
  { countryIso: 'VGB', regionCode: SubregionCode.CAR },
  { countryIso: 'BRN', regionCode: SubregionCode.SSE },
  { countryIso: 'BFA', regionCode: SubregionCode.WAF },
  { countryIso: 'BDI', regionCode: SubregionCode.WAF },
  { countryIso: 'KHM', regionCode: SubregionCode.SSE },
  { countryIso: 'CMR', regionCode: SubregionCode.WAF },
  { countryIso: 'CAN', regionCode: SubregionCode.NOA },
  { countryIso: 'CPV', regionCode: SubregionCode.WAF },
  { countryIso: 'CYM', regionCode: SubregionCode.CAR },
  { countryIso: 'CAF', regionCode: SubregionCode.WAF },
  { countryIso: 'TCD', regionCode: SubregionCode.WAF },
  { countryIso: 'CHN', regionCode: SubregionCode.EAS },
  { countryIso: 'COM', regionCode: SubregionCode.ESA },
  { countryIso: 'COG', regionCode: SubregionCode.WAF },
  { countryIso: 'CRI', regionCode: SubregionCode.CAM },
  { countryIso: 'CIV', regionCode: SubregionCode.WAF },
  { countryIso: 'CUB', regionCode: SubregionCode.CAR },
  { countryIso: 'CUW', regionCode: SubregionCode.CAR },
  { countryIso: 'CYP', regionCode: SubregionCode.WCA },
  { countryIso: 'PRK', regionCode: SubregionCode.EAS },
  { countryIso: 'COD', regionCode: SubregionCode.WAF },
  { countryIso: 'DJI', regionCode: SubregionCode.ESA },
  { countryIso: 'DMA', regionCode: SubregionCode.CAR },
  { countryIso: 'DOM', regionCode: SubregionCode.CAR },
  { countryIso: 'EGY', regionCode: SubregionCode.NAF },
  { countryIso: 'SLV', regionCode: SubregionCode.CAM },
  { countryIso: 'GNQ', regionCode: SubregionCode.WAF },
  { countryIso: 'ERI', regionCode: SubregionCode.ESA },
  { countryIso: 'ETH', regionCode: SubregionCode.ESA },
  { countryIso: 'GAB', regionCode: SubregionCode.WAF },
  { countryIso: 'GMB', regionCode: SubregionCode.WAF },
  { countryIso: 'GEO', regionCode: SubregionCode.WCA },
  { countryIso: 'GHA', regionCode: SubregionCode.WAF },
  { countryIso: 'GRL', regionCode: SubregionCode.NOA },
  { countryIso: 'GRD', regionCode: SubregionCode.CAR },
  { countryIso: 'GLP', regionCode: SubregionCode.CAR },
  { countryIso: 'GTM', regionCode: SubregionCode.CAM },
  { countryIso: 'GIN', regionCode: SubregionCode.WAF },
  { countryIso: 'GNB', regionCode: SubregionCode.WAF },
  { countryIso: 'HTI', regionCode: SubregionCode.CAR },
  { countryIso: 'HND', regionCode: SubregionCode.CAM },
  { countryIso: 'IND', regionCode: SubregionCode.SSE },
  { countryIso: 'IDN', regionCode: SubregionCode.SSE },
  { countryIso: 'IRN', regionCode: SubregionCode.WCA },
  { countryIso: 'IRQ', regionCode: SubregionCode.WCA },
  { countryIso: 'ISR', regionCode: SubregionCode.WCA },
  { countryIso: 'JAM', regionCode: SubregionCode.CAR },
  { countryIso: 'JPN', regionCode: SubregionCode.EAS },
  { countryIso: 'JOR', regionCode: SubregionCode.WCA },
  { countryIso: 'KAZ', regionCode: SubregionCode.WCA },
  { countryIso: 'KEN', regionCode: SubregionCode.ESA },
  { countryIso: 'KWT', regionCode: SubregionCode.WCA },
  { countryIso: 'KGZ', regionCode: SubregionCode.WCA },
  { countryIso: 'LAO', regionCode: SubregionCode.SSE },
  { countryIso: 'LBN', regionCode: SubregionCode.WCA },
  { countryIso: 'LSO', regionCode: SubregionCode.ESA },
  { countryIso: 'LBR', regionCode: SubregionCode.WAF },
  { countryIso: 'LBY', regionCode: SubregionCode.NAF },
  { countryIso: 'MDG', regionCode: SubregionCode.ESA },
  { countryIso: 'MWI', regionCode: SubregionCode.ESA },
  { countryIso: 'MYS', regionCode: SubregionCode.SSE },
  { countryIso: 'MDV', regionCode: SubregionCode.SSE },
  { countryIso: 'MLI', regionCode: SubregionCode.WAF },
  { countryIso: 'MTQ', regionCode: SubregionCode.CAR },
  { countryIso: 'MRT', regionCode: SubregionCode.NAF },
  { countryIso: 'MUS', regionCode: SubregionCode.ESA },
  { countryIso: 'MYT', regionCode: SubregionCode.ESA },
  { countryIso: 'MEX', regionCode: SubregionCode.NOA },
  { countryIso: 'MNG', regionCode: SubregionCode.EAS },
  { countryIso: 'MSR', regionCode: SubregionCode.CAR },
  { countryIso: 'MAR', regionCode: SubregionCode.NAF },
  { countryIso: 'MOZ', regionCode: SubregionCode.ESA },
  { countryIso: 'MMR', regionCode: SubregionCode.SSE },
  { countryIso: 'NAM', regionCode: SubregionCode.ESA },
  { countryIso: 'NPL', regionCode: SubregionCode.SSE },
  { countryIso: 'NIC', regionCode: SubregionCode.CAM },
  { countryIso: 'NER', regionCode: SubregionCode.WAF },
  { countryIso: 'NGA', regionCode: SubregionCode.WAF },
  { countryIso: 'PSE', regionCode: SubregionCode.WCA },
  { countryIso: 'OMN', regionCode: SubregionCode.WCA },
  { countryIso: 'PAK', regionCode: SubregionCode.SSE },
  { countryIso: 'PAN', regionCode: SubregionCode.CAM },
  { countryIso: 'PHL', regionCode: SubregionCode.SSE },
  { countryIso: 'PRI', regionCode: SubregionCode.CAR },
  { countryIso: 'QAT', regionCode: SubregionCode.WCA },
  { countryIso: 'KOR', regionCode: SubregionCode.EAS },
  { countryIso: 'REU', regionCode: SubregionCode.ESA },
  { countryIso: 'RWA', regionCode: SubregionCode.WAF },
  { countryIso: 'SHN', regionCode: SubregionCode.WAF },
  { countryIso: 'KNA', regionCode: SubregionCode.CAR },
  { countryIso: 'LCA', regionCode: SubregionCode.CAR },
  { countryIso: 'MAF', regionCode: SubregionCode.CAR },
  { countryIso: 'SPM', regionCode: SubregionCode.NOA },
  { countryIso: 'VCT', regionCode: SubregionCode.CAR },
  { countryIso: 'BLM', regionCode: SubregionCode.CAR },
  { countryIso: 'STP', regionCode: SubregionCode.WAF },
  { countryIso: 'SAU', regionCode: SubregionCode.WCA },
  { countryIso: 'SEN', regionCode: SubregionCode.WAF },
  { countryIso: 'SYC', regionCode: SubregionCode.ESA },
  { countryIso: 'SLE', regionCode: SubregionCode.WAF },
  { countryIso: 'SGP', regionCode: SubregionCode.SSE },
  { countryIso: 'SXM', regionCode: SubregionCode.CAR },
  { countryIso: 'SOM', regionCode: SubregionCode.ESA },
  { countryIso: 'ZAF', regionCode: SubregionCode.ESA },
  { countryIso: 'SSD', regionCode: SubregionCode.NAF },
  { countryIso: 'LKA', regionCode: SubregionCode.SSE },
  { countryIso: 'SDN', regionCode: SubregionCode.NAF },
  { countryIso: 'SWZ', regionCode: SubregionCode.ESA },
  { countryIso: 'SYR', regionCode: SubregionCode.WCA },
  { countryIso: 'TJK', regionCode: SubregionCode.WCA },
  { countryIso: 'THA', regionCode: SubregionCode.SSE },
  { countryIso: 'TLS', regionCode: SubregionCode.SSE },
  { countryIso: 'TGO', regionCode: SubregionCode.WAF },
  { countryIso: 'TTO', regionCode: SubregionCode.CAR },
  { countryIso: 'TUN', regionCode: SubregionCode.NAF },
  { countryIso: 'TUR', regionCode: SubregionCode.WCA },
  { countryIso: 'TKM', regionCode: SubregionCode.WCA },
  { countryIso: 'TCA', regionCode: SubregionCode.CAR },
  { countryIso: 'UGA', regionCode: SubregionCode.ESA },
  { countryIso: 'ARE', regionCode: SubregionCode.WCA },
  { countryIso: 'TZA', regionCode: SubregionCode.ESA },
  { countryIso: 'USA', regionCode: SubregionCode.NOA },
  { countryIso: 'VIR', regionCode: SubregionCode.CAR },
  { countryIso: 'UZB', regionCode: SubregionCode.WCA },
  { countryIso: 'VNM', regionCode: SubregionCode.SSE },
  { countryIso: 'ESH', regionCode: SubregionCode.NAF },
  { countryIso: 'YEM', regionCode: SubregionCode.WCA },
  { countryIso: 'ZMB', regionCode: SubregionCode.ESA },
  { countryIso: 'ZWE', regionCode: SubregionCode.ESA },
]

const subregions: Array<Subregion> = [
  {
    regionCode: SubregionCode.ESA,
    name: 'eastern_and_southern_africa',
    parentCode: RegionCode.AF,
  },
  {
    regionCode: SubregionCode.NAF,
    name: 'northern_africa',
    parentCode: RegionCode.AF,
  },
  {
    regionCode: SubregionCode.WAF,
    name: 'western_and_central_africa',
    parentCode: RegionCode.AF,
  },
  {
    regionCode: SubregionCode.EAS,
    name: 'east_asia',
    parentCode: RegionCode.AS,
  },
  {
    regionCode: SubregionCode.SSE,
    name: 'south_and_southeast_asia',
    parentCode: RegionCode.AS,
  },
  {
    regionCode: SubregionCode.WCA,
    name: 'western_and_central_asia',
    parentCode: RegionCode.AS,
  },
  {
    regionCode: SubregionCode.CAM,
    name: 'central_america',
    parentCode: RegionCode.NA,
  },
  {
    regionCode: SubregionCode.CAR,
    name: 'caribbean',
    parentCode: RegionCode.NA,
  },
  {
    regionCode: SubregionCode.NOA,
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
