import { SelectHTMLAttributes, useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { Routes, SectionRouteParams } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Returned = SelectHTMLAttributes<HTMLSelectElement>['onChange']

type RouteParams = SectionRouteParams & {
  countryIso: CountryIso
}

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams() as RouteParams
  const originalDataPoint = useOriginalDataPoint()

  return useCallback<Returned>(
    (event) => {
      const { value: year } = event.target

      const originalDataPointUpdate = { ...originalDataPoint, year: Number(year) }
      const propsAction = { assessmentName, cycleName, countryIso, originalDataPoint: originalDataPointUpdate }
      dispatch(OriginalDataPointActions.updateOriginalDataPoint(propsAction))

      // Update url but do not push new entry to state
      const routeParams = { assessmentName, cycleName, countryIso, sectionName, year }
      const url = Routes.OriginalDataPoint.generatePath(routeParams)
      window.history.replaceState(null, null, url)
    },
    [assessmentName, countryIso, cycleName, dispatch, originalDataPoint, sectionName]
  )
}
