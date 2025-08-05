import { useMemo } from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'
import { UserStatus } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useUser } from 'client/store/user/hooks/user'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  status: StatusTransition
}

type Returned = Array<TablePaginatedFilter<TablePaginatedFilterType>>

export const useFilters = (props: Props): Returned => {
  const { status } = props
  const user = useUser()
  const recipientRoles = UserRoles.getRecipientRoles(status)

  return useMemo<Returned>(() => {
    return [
      {
        type: TablePaginatedFilterType.MULTI_SELECT,
        fieldName: 'roles',
        label: '',
        hidden: true,
        defaultValue: recipientRoles,
        multiLabelSummaryKey: 'roles',
        options: [],
      },
      {
        type: TablePaginatedFilterType.MULTI_SELECT,
        fieldName: 'excludeUuids',
        label: '',
        hidden: true,
        defaultValue: [user.uuid],
        multiLabelSummaryKey: 'excludeUuids',
        options: [],
      },
      {
        type: TablePaginatedFilterType.MULTI_SELECT,
        fieldName: 'statuses',
        label: '',
        hidden: true,
        defaultValue: [UserStatus.active],
        multiLabelSummaryKey: 'statuses',
        options: [],
      },
    ]
  }, [recipientRoles, user.uuid])
}
