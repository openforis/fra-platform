import { useCallback } from 'react'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { File } from 'meta/file/file'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = (files: Array<File>) => Promise<void>

export const useOnSuccess = (): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  return useCallback(
    async (files: Array<File>) => {
      const limit: number = undefined
      const page: number = undefined
      const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=false`
      const params = { assessmentName, countryIso, cycleName }

      await Promise.all(
        (files ?? []).map((file) => {
          const props = { public: true, translation: { en: file.name } }
          const repositoryItem: Partial<RepositoryItem> = { countryIso, fileUuid: file.uuid, props }
          return axios.post(ApiEndPoint.CycleData.Repository.one(), { repositoryItem }, { params })
        })
      )

      dispatch(TablePaginatedActions.getData({ assessmentName, countryIso, cycleName, limit, page, path }))
    },
    [assessmentName, countryIso, cycleName, dispatch]
  )
}
