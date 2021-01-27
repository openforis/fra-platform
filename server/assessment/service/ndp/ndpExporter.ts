// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
const NdpRepository = require('../../../odp/odpRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CsvOutput'... Remove this comment to see the full error message
const CsvOutput = require('../csvOutput')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fields'.
const fields = [
  'Year',
  'Reference',
  'National Forest Inventory',
  'Sample-based remote sensing assessment',
  'Full-cover forest/vegetation maps',
  'Registers/questionnaires',
  'Other',
  'Additional comments',
]

const normalizeValue = R.pipe(
  R.defaultTo(''),
  // R.replace(/\n\r/g, ' '),
  R.replace(/"/g, "'"),
  R.split(/\r\n|\r|\n/g),
  R.join(' ')
)

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryData = async (country: any) => {
  const dataPoints = await NdpRepository.listOriginalDataPoints(country.countryIso)

  const result: any = []

  const getMethodUsed = (ndp: any, value: any) => (R.contains(value, ndp.dataSourceMethods || []) ? 'YES' : 'NO')
  // ["nationalForestInventory","sampleBasedRemoteSensingAssessment","fullCoverMaps","registersQuestionnaires","other"]

  dataPoints.forEach((ndp: any) => {
    const { year } = ndp
    if (!(R.isNil(year) || R.isEmpty(year))) {
      const row = {
        ...country,
        Year: year,
        Reference: normalizeValue(ndp.dataSourceReferences),
        'National Forest Inventory': getMethodUsed(ndp, 'nationalForestInventory'),
        'Sample-based remote sensing assessment': getMethodUsed(ndp, 'sampleBasedRemoteSensingAssessment'),
        'Full-cover forest/vegetation maps': getMethodUsed(ndp, 'fullCoverMaps'),
        'Registers/questionnaires': getMethodUsed(ndp, 'registersQuestionnaires'),
        Other: getMethodUsed(ndp, 'other'),
        'Additional comments': normalizeValue(ndp.dataSourceAdditionalComments),
      }

      result.push(row)
    }
  })

  return result
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCsvOutp... Remove this comment to see the full error message
const getCsvOutput = () => {
  return new CsvOutput('NationalDataPoints', fields)
}

module.exports = {
  getCountryData,
  getCsvOutput,
}
