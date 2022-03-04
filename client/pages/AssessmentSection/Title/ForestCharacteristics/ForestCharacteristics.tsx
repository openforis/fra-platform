import React from 'react'

import { useTranslation } from 'react-i18next'
import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { sectionName } = props

  const i18n = useTranslation()
  // const [printView, printOnlyTablesView] = [false, false] //TODO: usePrintView()
  // const hasOdps = false // useSelector(ForestCharacteristicsState.hasOriginalDataPoints)

  return (
    <>
      <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>

      {/* {hasOdps && printView && !printOnlyTablesView && <OriginalDataPointsPrint section={sectionName} />} */}
    </>
  )
}

export default ForestCharacteristics
