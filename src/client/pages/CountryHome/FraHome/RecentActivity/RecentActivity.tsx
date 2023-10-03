import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import EmptyActivities from 'client/pages/CountryHome/FraHome/RecentActivity/EmptyActivities'

import { useColumns } from './hooks/useColumns'
import { limit } from './limit'

const RecentActivity: React.FC = () => {
  const columns = useColumns()

  const path = ApiEndPoint.CycleData.activities()

  return (
    <TablePaginated EmptyListComponent={EmptyActivities} header={false} limit={limit} columns={columns} path={path} />
  )
}

export default RecentActivity
