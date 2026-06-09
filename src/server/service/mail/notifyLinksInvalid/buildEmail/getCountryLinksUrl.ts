import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'

import { ProcessEnv } from 'server/utils'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
}

// Return links to the linkStatus page per assessment x cycle x country
export const getCountryLinksUrl = (props: Props): string =>
  `${ProcessEnv.appUri}${Routes.CountryHomeSection.generatePath({ ...props, sectionName: SectionNames.Country.Home.linksStatus })}`
