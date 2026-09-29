import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import { useColumns } from 'client/pages/AdminTracking/hooks/useColumns'

const AdminTracking: React.FC = () => {
  const columns = useColumns()

  return <TablePaginated columns={columns} counter={{ show: false }} path={ApiEndPoint.Analytics.trackingEvents()} />
}

export default AdminTracking
