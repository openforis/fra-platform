const R = require('ramda')
const NdpRepository = require('../../../odp/odpRepository')

const CsvOutput = require('../csvOutput')

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

const ndpCSVOutput = new CsvOutput('NationalDataPoints', fields)

const normalizeValue = R.pipe(
  R.defaultTo(''),
  // R.replace(/\n\r/g, ' '),
  R.replace(/"/g, '\''),
  R.split(/\r\n|\r|\n/g),
  R.join(' '),
)

const getCountryData = async country => {

  const dataPoints = await NdpRepository.listOriginalDataPoints(country.countryIso)

  const result = []

  const getMethodUsed = (ndp, value) => R.contains(value, ndp.dataSourceMethods || []) ? 'YES' : 'NO'
  //["nationalForestInventory","sampleBasedRemoteSensingAssessment","fullCoverMaps","registersQuestionnaires","other"]

  dataPoints.forEach(ndp => {
    const year = ndp.year
    if (!(R.isNil(year) && R.isEmpty(year))) {

      const row = {
        ...country,
        'Year': year,
        'Reference': normalizeValue(ndp.dataSourceReferences),
        'National Forest Inventory': getMethodUsed(ndp, 'nationalForestInventory'),
        'Sample-based remote sensing assessment': getMethodUsed(ndp, 'sampleBasedRemoteSensingAssessment'),
        'Full-cover forest/vegetation maps': getMethodUsed(ndp, 'fullCoverMaps'),
        'Registers/questionnaires': getMethodUsed(ndp, 'registersQuestionnaires'),
        'Other': getMethodUsed(ndp, 'other'),
        'Additional comments': normalizeValue(ndp.dataSourceAdditionalComments),
      }

      result.push(row)
    }
  })

  return result
}

const getCsvOutput = () => ndpCSVOutput

module.exports = {
  getCountryData,
  getCsvOutput,
}
