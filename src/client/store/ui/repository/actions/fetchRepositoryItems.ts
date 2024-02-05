import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'

import { AppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'

type Props = CycleParams & {
  dispatch: AppDispatch
}

export const fetchRepositoryItems = (props: Props) => {
  const { dispatch } = props

  const paths = ['', '?global=true'].map((path) => `${ApiEndPoint.CycleData.Repository.many() + path}`)
  const limit: number = undefined
  const page: number = undefined

  paths.forEach((path) => {
    const getDataProps = { ...props, path, limit, page }
    dispatch(TablePaginatedActions.getData(getDataProps))
  })
}
