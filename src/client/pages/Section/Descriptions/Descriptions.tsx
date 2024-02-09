import './Descriptions.scss'
import React from 'react'

import { Description } from 'meta/assessment'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import AnalysisDescriptions from 'client/pages/Section/Descriptions/AnalysisDescriptions'
import NationalDataDescriptions from 'client/pages/Section/Descriptions/NationalDataDescriptions'

import { useDescriptions } from './hooks/useDescriptions'

type Props = {
  descriptions: Description
  sectionName: string
}

const Descriptions: React.FC<Props> = (props: Props) => {
  const { sectionName, descriptions } = props

  const { print, onlyTables } = useIsPrintRoute()
  const { analysisAndProcessing, nationalData } = useDescriptions({ descriptions, sectionName })

  if (!nationalData && !analysisAndProcessing) {
    return null
  }

  return (
    <>
      <div className="descriptions">
        {nationalData && (
          <NationalDataDescriptions
            nationalData={nationalData}
            sectionName={sectionName}
            showAlertEmptyContent={!print}
            showDashEmptyContent={print}
          />
        )}

        {analysisAndProcessing && (
          <AnalysisDescriptions
            analysisAndProcessing={analysisAndProcessing}
            sectionName={sectionName}
            showAlertEmptyContent={!print}
            showDashEmptyContent={print}
          />
        )}
      </div>
      {print && !onlyTables && <div className="page-break" />}
    </>
  )
}

export default Descriptions
