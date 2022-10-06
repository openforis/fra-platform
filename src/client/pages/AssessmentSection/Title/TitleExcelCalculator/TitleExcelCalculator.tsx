import './TitleExcelCalculator.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Props } from '../props'
import ExcelCalculatorDownload from './ExcelCalculatorDownload'

const TitleExcelCalculator: React.FC<Props> = (props) => {
  const { subSection } = props
  const { i18n } = useTranslation()

  const sectionName = subSection.props.name

  return (
    <div className="title-with-excel-calculator">
      <h2 className="headline no-print">{i18n.t<string>(`${sectionName}.${sectionName}`)}</h2>
      <ExcelCalculatorDownload />
    </div>
  )
}

export default TitleExcelCalculator
