import React, { Suspense } from 'react'

import { DataExportSlice } from 'client/store/dataExport/slice'
import { DataExportSliceName } from 'client/store/dataExport/slice/name'
import { ExplorerSlice } from 'client/store/explorer/slice'
import { ExplorerSliceName } from 'client/store/explorer/slice/name'
import { useInjectSlice } from 'client/store/hooks'
import Loading from 'client/components/Loading'

const DataExportLazy = React.lazy(() => import('client/pages/DataExport'))
const ExplorerLazy = React.lazy(() => import('client/pages/Explorer'))

export const DataExportView: React.FC = () => {
  useInjectSlice({ reducerPath: DataExportSliceName, reducer: DataExportSlice.reducer })

  return (
    <Suspense fallback={<Loading />}>
      <DataExportLazy />
    </Suspense>
  )
}

export const ExplorerView: React.FC = () => {
  useInjectSlice({ reducerPath: ExplorerSliceName, reducer: ExplorerSlice })

  return (
    <Suspense fallback={<Loading />}>
      <ExplorerLazy />
    </Suspense>
  )
}
