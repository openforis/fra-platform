import './TitleExcelCalculator.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useIsPrint } from 'client/hooks/useIsPath'

import { Props } from '../props'
import ExcelCalculatorDownload from './ExcelCalculatorDownload'

const TitleExcelCalculator: React.FC<Props> = (props) => {
  const { subSection } = props
  const { print } = useIsPrint()
  const { t } = useTranslation()
  const cycle = useCycle()

  return (
    <div className="title-with-excel-calculator">
      <h2 className="headline no-print">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</h2>
      {!print && <ExcelCalculatorDownload />}
    </div>
  )
}

export default TitleExcelCalculator
