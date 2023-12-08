import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useGetContacts = () => {
  const { assessmentName, cycleName, countryIso: _countryIso, sectionName } = useSectionRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(DataActions.getContacts({ assessmentName, cycleName, countryIso, sectionName }))
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName])
}
