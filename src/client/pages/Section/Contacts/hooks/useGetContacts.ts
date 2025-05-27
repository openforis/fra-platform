import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { DataActions } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useGetContacts = () => {
  const { assessmentName, countryIso: _countryIso, cycleName, sectionName } = useSectionRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(DataActions.getContacts({ assessmentName, cycleName, countryIso, sectionName }))
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName])
}
