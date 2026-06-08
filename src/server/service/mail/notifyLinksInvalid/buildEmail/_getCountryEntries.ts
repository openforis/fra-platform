import { TFunction } from 'i18next'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Link } from 'meta/cycleData/links/link'

import { LinksByCountry } from '../types'
import { getCountryLinksUrl } from './getCountryLinksUrl'
import { CountryEntry } from './types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  linksByCountry: LinksByCountry
  t: TFunction
}

export const _getCountryEntries = (props: Props): Array<CountryEntry> => {
  const { assessmentName, cycleName, linksByCountry, t } = props

  const entries = Object.entries(linksByCountry) as Array<[CountryIso, Array<Link>]>

  return entries.map(([countryIso, links]) => ({
    countryIso,
    countryName: t(`area.${countryIso}.listName`),
    countryLinksUrl: getCountryLinksUrl({ assessmentName, cycleName, countryIso }),
    links,
  }))
}
