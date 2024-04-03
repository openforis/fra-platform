import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const path = ApiEndPoint.CycleData.activities()
export const useGetData = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  useEffect(() => {
    const params = { assessmentName, cycleName, countryIso, path, page: 0, limit: 20 }
    dispatch(TablePaginatedActions.getData(params))
  }, [assessmentName, countryIso, cycleName, dispatch])
}
