import CSVOutput from '../csvOutput'

import CountryConfigExporter from '../exporter/countryConfigExporter'

import ForestExpansionDeforestationNetChangeExporter from './section_1/forestExpansionDeforestationNetChangeExporter'
import AnnualReforestationExporter from './section_1/annualReforestationExporter'

export const YEARS_INTERVAL = ['1990-2000', '2000-2010', '2010-2015', '2015-2020']

export const fetchCountryData = async (countryIso: any) =>
  await Promise.all([
    CountryConfigExporter.fetchData(countryIso),
    // 1c, 1d
    ForestExpansionDeforestationNetChangeExporter.fetchData(countryIso),
    AnnualReforestationExporter.fetchData(countryIso),
  ])

export const getCountryData = async (country: any) => {
  const [
    countryConfig,
    // 1c
    forestExpansionDeforestationNetChange,
    annualReforestation,
  ] = await fetchCountryData(country.countryIso)

  // iterate over years
  return YEARS_INTERVAL.map((year, yearIdx) => ({
    ...country,
    year,
    // country config
    ...CountryConfigExporter.parseResultRow(countryConfig),
    // 1c, 1d
    ...ForestExpansionDeforestationNetChangeExporter.parseResultRow(
      forestExpansionDeforestationNetChange,
      yearIdx,
      year
    ),
    ...AnnualReforestationExporter.parseResultRow(annualReforestation, yearIdx, year),
  }))
}

export const getCsvOutput = () => {
  const fields = [
    'year',
    // country config
    ...CountryConfigExporter.fields,
    // 1c, 1d
    ...ForestExpansionDeforestationNetChangeExporter.fieldsWithLabels,
    ...AnnualReforestationExporter.fieldsWithLabels,
  ]

  return new CSVOutput('Intervals', fields)
}

export default {
  getCountryData,
  getCsvOutput,
}
