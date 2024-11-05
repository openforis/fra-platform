import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'

type Props = {
  path: string
}

export const useResetOnUnmount = (props: Props): void => {
  const { path } = props

  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(TablePaginatedActions.resetPaths({ paths: [path] }))
    }
  }, [dispatch, path])
}
