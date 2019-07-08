const R = require('ramda')
const NdpRepository = require('../../../odp/odpRepository')

const CsvOutput = require('../csvOutput')

const fields = [
  'Year',
  'Reference',
  'Methods used: National Forest Inventory',
  'Methods used: Sample-based remote sensing assessment',
  'Methods used: Full-cover forest/vegetation maps',
  'Methods used: Registers/questionnaires',
  'Methods used: Other',
  'Additional comments',
]

const ndpCSVOutput = new CsvOutput('NationalDataPoints', fields)

const getCountryData = async country => {

  const dataPoints = await NdpRepository.listOriginalDataPoints(country.countryIso)

  const getMethodUsed = (ndp, value) => R.contains(value, ndp.dataSourceMethods || []) ? 'YES' : 'NO'
  //["nationalForestInventory","sampleBasedRemoteSensingAssessment","fullCoverMaps","registersQuestionnaires","other"]
  const result = dataPoints.map(ndp => ({
    ...country,
    'Year': ndp.year,
    'Reference': ndp.dataSourceReferences,
    'Methods used: National Forest Inventory': getMethodUsed(ndp, 'nationalForestInventory'),
    'Methods used: Sample-based remote sensing assessment': getMethodUsed(ndp, 'sampleBasedRemoteSensingAssessment'),
    'Methods used: Full-cover forest/vegetation maps': getMethodUsed(ndp, 'fullCoverMaps'),
    'Methods used: Registers/questionnaires': getMethodUsed(ndp, 'registersQuestionnaires'),
    'Methods used: Other': getMethodUsed(ndp, 'other'),
    'Additional comments': ndp.dataSourceAdditionalComments,
  }))

  return result
}

const getCsvOutput = () => ndpCSVOutput

module.exports = {
  getCountryData,
  getCsvOutput,
}
