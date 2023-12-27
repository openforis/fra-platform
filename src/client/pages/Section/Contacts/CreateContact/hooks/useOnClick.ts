import { useCallback, useState } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type OnClick = () => void
type Returned = { onClick: OnClick; loading: boolean }

export const useOnClick = (): Returned => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()

  const onClick = useCallback<OnClick>(async () => {
    setLoading(true)
    const params = { assessmentName, cycleName, countryIso, sectionName }

    try {
      await dispatch(DataActions.createContact(params))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [dispatch, assessmentName, cycleName, countryIso, sectionName])

  return {
    loading,
    onClick,
  }
}
