import React, { useRef } from 'react'

import { OriginalDataPoint } from 'meta/assessment'

import { NationalClassesTable } from './components/NationalClassesTable'
import { Prefill } from './components/Prefill'
import { Title } from './components/Title'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const NationalClasses: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { year } = originalDataPoint
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="odp__section">
      <Title gridRef={gridRef} year={year} />
      <Prefill canEditData={canEditData} originalDataPoint={originalDataPoint} />
      <NationalClassesTable originalDataPoint={originalDataPoint} gridRef={gridRef} />
    </div>
  )
}

export default NationalClasses
