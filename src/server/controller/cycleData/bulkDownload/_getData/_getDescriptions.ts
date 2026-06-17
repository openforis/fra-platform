import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'

import { _getLastPublishedCountryData } from './_getLastPublishedCountryData'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  cycleCountries?: Record<CycleName, Array<CountryIso>>
  sectionNames: Array<SectionName>
}

export const _getDescriptions = async (props: Props): Promise<DescriptionCountryValues> => {
  const { assessment, countryISOs, cycle, cycleCountries, sectionNames } = props

  if (!cycleCountries) {
    return DescriptionRepository.getValues({ assessment, countryISOs, cycle, sectionNames })
  }

  return _getLastPublishedCountryData({
    assessment,
    cycleCountries,
    fetchFn: (assessment, countryISOs, cycle) =>
      DescriptionRepository.getValues({ assessment, countryISOs, cycle, sectionNames }),
  })
}
