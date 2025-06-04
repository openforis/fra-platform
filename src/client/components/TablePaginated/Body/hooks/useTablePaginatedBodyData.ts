import { Objects } from 'utils/objects'

import { useTablePaginatedData } from 'client/store/tablePaginated/hooks/tablePaginated'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

type Returned<Datum extends object> = Array<Datum> | Array<[PropertyKey, Array<Datum>]> | undefined

export const useTablePaginatedBodyData = <Datum extends object>(props: BaseProps<Datum>): Returned<Datum> => {
  const { compareFn, groups, path } = props

  const data = useTablePaginatedData<Datum>(path, compareFn)

  if (Objects.isNil(data) || Objects.isNil(groups)) {
    return data
  }

  return Object.entries(Object.groupBy(data ?? [], groups.keySelector))
}
