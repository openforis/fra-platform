import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'
import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'
import { useCompareFn } from './hooks/useCompareFn'
import { useFilters } from './hooks/useFilters'

type Props = {
  status: StatusTransition
}

const UserList: React.FC<Props> = (props) => {
  const { status } = props

  const columns = useColumns()
  const compareFn = useCompareFn()
  const filters = useFilters({ status })

  return (
    <TablePaginated
      columns={columns}
      compareFn={compareFn}
      counter={{ show: false }}
      filters={filters}
      path={`${ApiEndPoint.User.many()}#recipients`}
    />
  )
}

export default UserList
