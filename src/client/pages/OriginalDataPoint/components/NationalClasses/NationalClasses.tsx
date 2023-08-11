import React from 'react'

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

  return (
    <div className="odp__section">
      <Title />
      <Prefill canEditData={canEditData} originalDataPoint={originalDataPoint} />
      <NationalClassesTable canEditData={canEditData} originalDataPoint={originalDataPoint} />
    </div>
  )
}

export default NationalClasses
