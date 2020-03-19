import './title.less'

import React from 'react'
import PropTypes from 'prop-types'

import ExcelCalculatorDownload from '@webapp/app/assessment/components/section/components/title/titleWithExcelCalculator/excelCalculatorDownload'
import useI18n from '@webapp/components/hooks/useI18n'

const Title = props => {
  const { sectionName } = props
  const i18n = useI18n()

  return (
    <div className="title-with-excel-calculator">
      <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>
      <ExcelCalculatorDownload />
    </div>
  )
}

Title.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

export default Title
