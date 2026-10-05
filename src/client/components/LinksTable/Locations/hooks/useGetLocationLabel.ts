import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { SubSection } from 'meta/assessment/section'
import { LinkLocation } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSections } from 'client/store/meta/hooks/sections'

type Props = {
  includeCountryIso?: boolean
}

type GetLabelProps = {
  countryIso: CountryIso
  location: LinkLocation
}

type Returned = (props: GetLabelProps) => string

export const useGetLocationLabel = (props: Props): Returned => {
  const { includeCountryIso } = props
  const { t } = useTranslation()
  const assessment = useAssessment()
  const sections = useSections()
  const cycle = useCycle()

  const subSections = useMemo<Array<SubSection>>(
    () => sections?.flatMap((section) => section.subSections ?? []) ?? [],
    [sections]
  )

  return useCallback<Returned>(
    ({ countryIso, location }) => {
      return Links.getLocationLabel({
        assessment,
        countryIso,
        cycle,
        includeCountryIso,
        location,
        subSections,
        t,
      })
    },
    [assessment, cycle, includeCountryIso, subSections, t]
  )
}
