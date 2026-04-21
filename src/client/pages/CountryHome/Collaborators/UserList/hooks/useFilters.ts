import { useMemo } from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'
import { UserStatus } from 'meta/user/user'

import { MultiSelectItem, TablePaginatedFilter } from 'client/components/TablePaginated/types'

export const useFilters = (): Array<TablePaginatedFilter<TablePaginatedFilterType>> => {
  return useMemo(
    () => [
      {
        defaultValue: [UserStatus.active, UserStatus.invitationPending],
        fieldName: 'statuses',
        hidden: true,
        label: '',
        multiLabelSummaryKey: '',
        options: [] as Array<MultiSelectItem>,
        type: TablePaginatedFilterType.MULTI_SELECT,
      },
    ],
    []
  )
}
