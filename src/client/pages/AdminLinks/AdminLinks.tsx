import React from 'react'

import { AdminSliceName } from 'client/store/admin/name'
import { AdminSlice } from 'client/store/admin/slice'
import { useInjectSlice } from 'client/store/hooks'
import LinksTable from 'client/components/LinksTable'
import { useInitSections } from 'client/pages/Country/hooks/useInitSections'

const AdminLinks: React.FC = () => {
  useInjectSlice({ reducerPath: AdminSliceName, reducer: AdminSlice })
  useInitSections()

  return <LinksTable />
}

export default AdminLinks
