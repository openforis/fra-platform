import './TitleExcelCalculator.scss'
import React from 'react'

import { useTranslation } from 'react-i18next'
import ExcelCalculatorDownload from './ExcelCalculatorDownload'

type Props = {
  sectionName: string
}

const TitleExcelCalculator: React.FC<Props> = (props: Props) => {
  const { sectionName } = props
  const { i18n } = useTranslation()

  return (
    <div className="title-with-excel-calculator">
      <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>
      <ExcelCalculatorDownload />
    </div>
  )
}

export default TitleExcelCalculator
