import * as R from 'ramda'

import { OdpService } from '@server/service'
import { Country, CountryIso, RegionCode } from '@core/country'
import { ODP } from '@core/odp'
import { Objects } from '@core/utils'
import { CountryAssessment } from '@core/country/country'
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

type getCountryDataType = Record<string, string | CountryIso | Array<RegionCode> | CountryAssessment | undefined>[]

export const getCountryData = async (country: Country): Promise<getCountryDataType> => {
  const dataPoints = await OdpService.listOriginalDataPoints({ countryIso: country.countryIso })

  const result: getCountryDataType = []

  const getMethodUsed = (odp: ODP, value: any) => (R.contains(value, odp.dataSourceMethods || []) ? 'YES' : 'NO')
  // ["nationalForestInventory","sampleBasedRemoteSensingAssessment","fullCoverMaps","registersQuestionnaires","other"]

  dataPoints.forEach((odp: ODP) => {
    const { year } = odp
    if (!Objects.isEmpty(year)) {
      const row = {
        ...country,
        Year: year,
        Reference: normalizeValue(odp.dataSourceReferences),
        'National Forest Inventory': getMethodUsed(odp, 'nationalForestInventory'),
        'Sample-based remote sensing assessment': getMethodUsed(odp, 'sampleBasedRemoteSensingAssessment'),
        'Full-cover forest/vegetation maps': getMethodUsed(odp, 'fullCoverMaps'),
        'Registers/questionnaires': getMethodUsed(odp, 'registersQuestionnaires'),
        Other: getMethodUsed(odp, 'other'),
        'Additional comments': normalizeValue(odp.dataSourceAdditionalComments),
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
