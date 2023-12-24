import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Returned = () => void

export const useOnClick = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  return useCallback<Returned>(() => {
    const params = { assessmentName, cycleName, countryIso, sectionName }
    dispatch(DataActions.createContact(params))
  }, [dispatch, assessmentName, cycleName, countryIso, sectionName])
}
