import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import {
  CommentableDescription,
  CommentableDescriptionKey,
  CommentableDescriptionName,
  DescriptionCountryValues,
} from 'meta/assessment/descriptionValue'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { LinkToVisit } from 'meta/cycleData/links/link'
import { NDPLinkFields, NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'

import { buildDescriptionLinks } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/utils/buildDescriptionLinks'
import { buildNationalDataPointLinks } from 'server/worker/tasks/verifyLinks/visitNationalDataPointLinks/utils/buildNationalDataPointLinks'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionValues: DescriptionCountryValues
  nationalDataPoints: Partial<Record<CountryIso, Array<OriginalDataPoint>>>
}

export type CountryLinks = {
  countryIso: CountryIso
  descriptions: Array<Omit<CommentableDescription, 'id'>>
  descriptionLinksToVisit: Array<LinkToVisit>
  nationalDataPointLinksToVisit: Array<LinkToVisit>
  nationalDataPointTargets: Array<NDPLinkTarget>
}

type GetDescriptionKeysProps = {
  countryIso: CountryIso
  descriptionValues: DescriptionCountryValues
}

const _getDescriptionKeys = (props: GetDescriptionKeysProps): Array<CommentableDescriptionKey> => {
  const { countryIso, descriptionValues } = props

  return Object.entries(descriptionValues[countryIso] ?? {}).flatMap<CommentableDescriptionKey>(
    ([sectionName, sectionValues]) => {
      // NDP data sources are stored as descriptions, but their links belong to the NDP flow.
      if (sectionName === SectionNames.nationalDataPoint) return []
      return Object.keys(sectionValues).map<CommentableDescriptionKey>((name) => ({
        name: name as CommentableDescriptionName,
        sectionName,
      }))
    }
  )
}

export const buildCountryLinks = (props: Props): CountryLinks => {
  const { assessment, countryIso, cycle, descriptionValues, nationalDataPoints } = props

  const descriptionKeys = _getDescriptionKeys({ countryIso, descriptionValues })
  const { descriptions, linksToVisit: descriptionLinksToVisit } = buildDescriptionLinks({
    assessment,
    countryIso,
    cycle,
    descriptionKeys,
    descriptionValues,
  })

  const countryNationalDataPoints = nationalDataPoints[countryIso] ?? []
  // Full links check job visits every field for each NDP.
  const targets = countryNationalDataPoints.map<NDPLinkTarget>(({ uuid }) => ({ fields: NDPLinkFields, ndpUuid: uuid }))
  const nationalDataPointLinksToVisit = buildNationalDataPointLinks({
    assessment,
    countryIso,
    cycle,
    nationalDataPoints: countryNationalDataPoints,
    targets,
  })

  return {
    countryIso,
    descriptions,
    descriptionLinksToVisit,
    nationalDataPointLinksToVisit,
    nationalDataPointTargets: targets,
  }
}
