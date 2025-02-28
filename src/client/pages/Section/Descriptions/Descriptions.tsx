import './Descriptions.scss'
import React from 'react'

import { Description } from 'meta/assessment'

import AnalysisDescriptions from 'client/pages/Section/Descriptions/AnalysisDescriptions'
import NationalDataDescriptions from 'client/pages/Section/Descriptions/NationalDataDescriptions'

import { useDescriptions } from './hooks/useDescriptions'

type Props = {
  descriptions: Description
}

const Descriptions: React.FC<Props> = (props: Props) => {
  const { descriptions } = props

  const { analysisAndProcessing, nationalData } = useDescriptions({ descriptions })

  if (!nationalData && !analysisAndProcessing) {
    return null
  }

  return (
    <div className="descriptions print-break-after">
      {nationalData && <NationalDataDescriptions nationalData={nationalData} />}

      {analysisAndProcessing && <AnalysisDescriptions analysisAndProcessing={analysisAndProcessing} />}
    </div>
  )
}

export default Descriptions
