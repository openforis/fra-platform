import './Observation.scss'
import React from 'react'

import { DataCell } from 'client/components/DataGrid'
import { ObservationProps } from 'client/pages/Explorer/ResultGrid/Observation/types'

import { useValue } from './hooks/useValue'

const Observation: React.FC<ObservationProps> = (props: ObservationProps) => {
  const { lastCol, lastRow } = props

  const value = useValue(props)

  return (
    <DataCell className="observation" lastCol={lastCol} lastRow={lastRow}>
      {value}
    </DataCell>
  )
}

export default React.memo(Observation)
