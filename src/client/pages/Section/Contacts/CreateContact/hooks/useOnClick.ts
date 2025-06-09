import { useCallback, useState } from 'react'

import { CountryIso } from 'meta/area'

import { ContactsActions } from 'client/store/data/contacts/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type OnClick = () => void
type Returned = { onClick: OnClick; loading: boolean }

export const useOnClick = (): Returned => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()

  const onClick = useCallback<OnClick>(async () => {
    setLoading(true)
    const params = { assessmentName, cycleName, countryIso, sectionName }

    try {
      await dispatch(ContactsActions.createContact(params))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName])

  return {
    loading,
    onClick,
  }
}
