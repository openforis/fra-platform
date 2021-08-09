import * as R from 'ramda'

import { OdpService } from '@server/service'
import { Country } from '@core/country'
import CsvOutput from '../csvOutput'

export const fields = [
  'Year',
  'Reference',
  'National Forest Inventory',
  'Sample-based remote sensing assessment',
  'Full-cover forest/vegetation maps',
  'Registers/questionnaires',
  'Other',
  'Additional comments',
]

export const normalizeValue = R.pipe(
  R.defaultTo(''),
  // R.replace(/\n\r/g, ' '),
  R.replace(/"/g, "'"),
  R.split(/\r\n|\r|\n/g),
  R.join(' ')
)

export const getCountryData = async (country: Country) => {
  const dataPoints = await OdpService.listOriginalDataPoints({ countryIso: country.countryIso })

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

export const getCsvOutput = () => {
  return new CsvOutput('NationalDataPoints', fields)
}

export default {
  getCountryData,
  getCsvOutput,
}
