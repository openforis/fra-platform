import './TitleExcelCalculator.scss'
import React from 'react'

import { useI18n } from '@webapp/hooks'

import ExcelCalculatorDownload from '@webapp/components/Assessment/SectionView/Title/TitleExcelCalculator/ExcelCalculatorDownload'
import { Props } from '../props'

const TitleExcelCalculator: React.FC<Props> = (props: Props) => {
  const { sectionName } = props
  const i18n = useI18n()

  return (
    <div className="title-with-excel-calculator">
      <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>
      <ExcelCalculatorDownload />
    </div>
  )
}

export default TitleExcelCalculator
