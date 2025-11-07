import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { SubSection } from 'meta/assessment/section'
import { LinkLocation } from 'meta/cycleData'
import { Links } from 'meta/cycleData/links/links'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSections } from 'client/store/meta/hooks/sections'
import { useIsPanEuropeanRoute } from 'client/hooks/routes'

type GetLabelProps = {
  countryIso: CountryIso
  location: LinkLocation
}

type Returned = (props: GetLabelProps) => string

export const useGetLocationLabel = (): Returned => {
  const { t } = useTranslation()
  const isPanEuropean = useIsPanEuropeanRoute()
  const sections = useSections()
  const cycle = useCycle()

  const subSections = useMemo<Array<SubSection>>(
    () => sections?.flatMap((section) => section.subSections ?? []) ?? [],
    [sections]
  )

  return useCallback<Returned>(
    ({ countryIso, location }) => {
      return Links.getLocationLabel({
        countryIso,
        cycle,
        isPanEuropean,
        location,
        subSections,
        t,
      })
    },
    [cycle, isPanEuropean, subSections, t]
  )
}
