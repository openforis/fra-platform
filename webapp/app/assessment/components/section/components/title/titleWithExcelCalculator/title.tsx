import './title.less'
import React from 'react'
import ExcelCalculatorDownload from '@webapp/app/assessment/components/section/components/title/titleWithExcelCalculator/excelCalculatorDownload'
import useI18n from '@webapp/components/hooks/useI18n'

type Props = {
  sectionName: string
}
const Title = (props: Props) => {
  const { sectionName } = props
  const i18n = useI18n()
  return (
    <div className="title-with-excel-calculator">
      <h2 className="headline no-print">{(i18n as any).t(`${sectionName}.${sectionName}`)}</h2>
      <ExcelCalculatorDownload />
    </div>
  )
}
export default Title
