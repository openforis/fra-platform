import './TitleExcelCalculator.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'

import { Props } from '../props'
import ExcelCalculatorDownload from './ExcelCalculatorDownload'

const TitleExcelCalculator: React.FC<Props> = (props) => {
  const { subSection } = props

  const { t } = useTranslation()
  const cycle = useCycle()

  return (
    <div className="title-with-excel-calculator">
      <h2 className="headline no-print">{Labels.getLabel({ cycle, labels: subSection.props.labels, t })}</h2>
      <ExcelCalculatorDownload />
    </div>
  )
}

export default TitleExcelCalculator
