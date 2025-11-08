import './TitleExcelCalculator.scss'
import React from 'react'

import { useIsPrintRoute } from 'client/hooks/routes'
import { TitleDefault } from 'client/pages/Section/Title/Components'

import { Props } from '../props'
import ExcelCalculatorDownload from './ExcelCalculatorDownload'

const TitleExcelCalculator: React.FC<Props> = (props) => {
  const { subSection } = props
  const { print } = useIsPrintRoute()

  return (
    <div className="title-with-excel-calculator">
      <TitleDefault subSection={subSection} />

      {!print && <ExcelCalculatorDownload />}
    </div>
  )
}

export default TitleExcelCalculator
