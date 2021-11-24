import React from 'react'
import { useSelector } from 'react-redux'

import * as ForestCharacteristicsState from '../../../../../sectionSpec/fra/forestCharacteristics/forestCharacteristicsState'
import { useI18n } from '../../../../../hooks'
import { usePrintView } from '../../../../../store/app'

import OriginalDataPointsPrint from '../../../../../components/OriginalDataPoint/OriginalDataPointsPrint'
import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { sectionName } = props

  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const hasOdps = useSelector(ForestCharacteristicsState.hasOriginalDataPoints)

  return (
    <>
      <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>

      {hasOdps && printView && !printOnlyTablesView && <OriginalDataPointsPrint section={sectionName} />}
    </>
  )
}

export default ForestCharacteristics
