import './tableWithOdp.less'

import React from 'react'
import PropTypes from 'prop-types'

import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import useI18n from '@webapp/components/hooks/useI18n'
import GenerateValues from '@webapp/app/assessment/fra/components/tableWithOdp/components/generateValues'
import Table from '@webapp/app/assessment/fra/components/tableWithOdp/components/table'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const TableWithOdp = props => {
  const {
    fra,
    rows,
    section,
    sectionAnchor,
    copyValues,
    disabled,
    generateValues,
    useOriginalDataPoints,
    tableHeaderLabel,
    categoryHeaderLabel,
  } = props

  const i18n = useI18n()
  const countryIso = useCountryIso()

  return (
    <>
      {!disabled && generateValues && (
        <div className="app-view__section-toolbar no-print">
          <GenerateValues
            i18n={i18n}
            section={section}
            countryIso={countryIso}
            fra={fra}
            rows={rows}
            useOriginalDataPoints={useOriginalDataPoints}
          />
        </div>
      )}

      {!isPrintingOnlyTables() && <div className="page-break" />}

      <div className="fra-table__container table-with-odp">
        <div className="fra-table__scroll-wrapper">
          <Table
            fra={fra}
            rows={rows}
            section={section}
            sectionAnchor={sectionAnchor}
            copyValues={copyValues}
            disabled={disabled}
            tableHeaderLabel={tableHeaderLabel}
            categoryHeaderLabel={categoryHeaderLabel}
          />
        </div>
      </div>
    </>
  )
}

TableWithOdp.propTypes = {
  // data
  fra: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,

  // boolean checks
  copyValues: PropTypes.bool,
  disabled: PropTypes.bool,
  generateValues: PropTypes.bool.isRequired,
  useOriginalDataPoints: PropTypes.bool,

  // labels
  tableHeaderLabel: PropTypes.string.isRequired,
  categoryHeaderLabel: PropTypes.string.isRequired,
}

TableWithOdp.defaultProps = {
  copyValues: true,
  disabled: false,
  useOriginalDataPoints: true,
}

export default TableWithOdp
