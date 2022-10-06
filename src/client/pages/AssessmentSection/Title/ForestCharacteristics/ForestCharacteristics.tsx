import React from 'react'
import { useTranslation } from 'react-i18next'

import { useOriginalDataPointYears } from '@client/store/pages/assessmentSection'
import { useIsPrint } from '@client/hooks/useIsPath'
import OriginalDataPointsPrint from '@client/pages/AssessmentPrint/OriginalDataPointsPrint'

import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { subSection } = props

  const i18n = useTranslation()
  const odpYears = useOriginalDataPointYears()

  const { print, onlyTables } = useIsPrint()
  const hasOdps = Array.isArray(odpYears)
  const sectionName = subSection.props.name

  return (
    <>
      <h2 className="headline no-print">{i18n.t<string>(`${sectionName}.${sectionName}`)}</h2>

      {hasOdps && print && !onlyTables && <OriginalDataPointsPrint sectionName={sectionName} />}
    </>
  )
}

export default ForestCharacteristics
