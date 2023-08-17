import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useOriginalDataPointYears } from 'client/store/data'
import { useIsPrint } from 'client/hooks/useIsPath'
import OriginalDataPointsPrint from 'client/pages/AssessmentPrint/OriginalDataPointsPrint'

import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { subSection } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const odpYears = useOriginalDataPointYears()
  const { print, onlyTables } = useIsPrint()
  const hasOdps = Array.isArray(odpYears)

  return (
    <>
      <h2 className="headline no-print">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</h2>

      {hasOdps && print && !onlyTables && <OriginalDataPointsPrint sectionName={subSection.props.name} />}
    </>
  )
}

export default ForestCharacteristics
