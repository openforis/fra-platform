import { useMemo } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'
import { Objects } from 'utils/objects'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
}

type Returned = string

export const useLinksStatusUrl = (props: Props): Returned => {
  const { assessmentName, countryIso, cycleName } = props

  return useMemo<Returned>(() => {
    if ([assessmentName, countryIso, cycleName].some(Objects.isEmpty)) return ''
    return Routes.CountryHomeSection.generatePath({
      assessmentName,
      countryIso,
      cycleName,
      sectionName: SectionNames.Country.Home.linksStatus,
    })
  }, [assessmentName, countryIso, cycleName])
}
