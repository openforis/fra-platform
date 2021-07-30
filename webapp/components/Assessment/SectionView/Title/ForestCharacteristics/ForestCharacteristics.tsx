import React from 'react'
import { useSelector } from 'react-redux'

import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import { useI18n, usePrintView } from '@webapp/components/hooks'

import NationalDataPointsPrintView from '@webapp/app/assessment/fra/sections/originalDataPoint/nationalDataPointsPrintView'
import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { sectionName } = props

  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const hasOdps = useSelector(ForestCharacteristicsState.hasOriginalDataPoints)

  return (
    <>
      <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>

      {hasOdps && printView && !printOnlyTablesView && <NationalDataPointsPrintView section={sectionName} />}
    </>
  )
}

export default ForestCharacteristics
