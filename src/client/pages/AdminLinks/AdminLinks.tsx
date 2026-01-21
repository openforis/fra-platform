import React from 'react'

import { useInjectSlice } from 'client/store/hooks'
import { LinksSlice } from 'client/store/links/slice'
import { LinksSliceName } from 'client/store/links/slice/name'
import LinksTable from 'client/components/LinksTable'
import { useInitSections } from 'client/pages/Country/hooks/useInitSections'

const AdminLinks: React.FC = () => {
  useInjectSlice({ reducerPath: LinksSliceName, reducer: LinksSlice.reducer })
  useInitSections()

  return <LinksTable />
}

export default AdminLinks
