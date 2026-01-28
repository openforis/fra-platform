import { useCallback } from 'react'

import { CountryStatus } from 'meta/area/countryStatus'

import { useAppDispatch } from 'client/store/hooks'
import { AreaSelectorActions } from 'client/store/ui/areaSelector/actions'

type Props = { roleName: string }
type Returned = (status: CountryStatus) => void

export const useHandleToggle = (props: Props): Returned => {
  const { roleName } = props
  const dispatch = useAppDispatch()

  return useCallback(
    (status: CountryStatus) => {
      dispatch(AreaSelectorActions.toggleStatusFilter({ roleName, status }))
    },
    [dispatch, roleName]
  )
}
