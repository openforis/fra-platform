import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { ContactsActions } from 'client/store/data/contacts/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useGetContacts = (): void => {
  const { assessmentName, countryIso: _countryIso, cycleName, sectionName } = useSectionRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(ContactsActions.getContacts({ assessmentName, cycleName, countryIso, sectionName }))
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName])
}
