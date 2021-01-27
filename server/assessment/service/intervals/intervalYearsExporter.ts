// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
const CSVOutput = require('../csvOutput')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountryCon... Remove this comment to see the full error message
const CountryConfigExporter = require('../exporter/countryConfigExporter')
// 1
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ForestExpa... Remove this comment to see the full error message
const ForestExpansionDeforestationNetChangeExporter = require('./section_1/forestExpansionDeforestationNetChangeExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AnnualRefo... Remove this comment to see the full error message
const AnnualReforestationExporter = require('./section_1/annualReforestationExporter')

const YEARS_INTERVAL = ['1990-2000', '2000-2010', '2010-2015', '2015-2020']

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const fetchCountryData = async (countryIso: any) =>
  await Promise.all([
    CountryConfigExporter.fetchData(countryIso),
    // 1c, 1d
    ForestExpansionDeforestationNetChangeExporter.fetchData(countryIso),
    AnnualReforestationExporter.fetchData(countryIso),
  ])

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryData = async (country: any) => {
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
    ...CountryConfigExporter.parseResultRow(countryConfig, yearIdx, year),
    // 1c, 1d
    ...ForestExpansionDeforestationNetChangeExporter.parseResultRow(
      forestExpansionDeforestationNetChange,
      yearIdx,
      year,
      countryConfig
    ),
    ...AnnualReforestationExporter.parseResultRow(annualReforestation, yearIdx, year, countryConfig),
  }))
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCsvOutp... Remove this comment to see the full error message
const getCsvOutput = () => {
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

module.exports = {
  getCountryData,
  getCsvOutput,
}
