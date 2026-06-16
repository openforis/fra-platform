import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'

import { BulkDownloadODPData } from 'server/controller/cycleData/bulkDownload/types'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

import { _getLastPublishedCountryData } from './_getLastPublishedCountryData'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  cycleCountries?: Record<CycleName, Array<CountryIso>>
}

export const _getODPData = async (props: Props): Promise<BulkDownloadODPData> => {
  const { assessment, countryISOs, cycle, cycleCountries } = props

  if (!cycleCountries) {
    return OriginalDataPointRepository.getBulkDownloadData({ assessment, countryISOs, cycle })
  }

  return _getLastPublishedCountryData({
    assessment,
    cycleCountries,
    fetchFn: (assessment, countryISOs, cycle) =>
      OriginalDataPointRepository.getBulkDownloadData({ assessment, countryISOs, cycle }),
  })
}
