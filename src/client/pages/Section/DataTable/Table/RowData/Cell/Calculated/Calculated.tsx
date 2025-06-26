import React from 'react'

import { useGetValue } from 'client/pages/Section/DataTable/Table/RowData/Cell/Calculated/hooks/useGetValue'

import { PropsCell } from '../props'

const Calculated: React.FC<PropsCell> = (props) => {
  const value = useGetValue(props)
  return <div>{value}</div>
}

export default Calculated
