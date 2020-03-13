import './dataTable.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { isPrintingMode, isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import Table from '@webapp/app/assessment/components/dataTable/table'
import Chart from '@webapp/app/assessment/components/dataTable/chart'
import useI18n from '@webapp/components/hooks/useI18n'

const DataTable = props => {
  const { assessmentType, sectionName, sectionAnchor, tableSpec, copyValues, disabled } = props

  const { name: tableName, rows, getSectionData, isSectionDataEmpty, odp } = tableSpec

  const i18n = useI18n()
  const data = useSelector(getSectionData(assessmentType, sectionName, tableName))
  const dataEmpty = useSelector(isSectionDataEmpty(assessmentType, sectionName, tableName))

  if (!data) {
    return null
  }

  return (
    <>
      {odp && (!isPrintingMode() || (!isPrintingOnlyTables() && !dataEmpty)) && (
        <>
          <div className="page-break" />
          <Chart
            fra={data}
            trends={rows
              .filter(row => !!row.chartProps)
              .map(row => ({
                name: row.variableName,
                label: i18n.t(row.chartProps.labelKey),
                color: row.chartProps.color,
              }))}
          />
        </>
      )}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <Table
            assessmentType={assessmentType}
            sectionName={sectionName}
            sectionAnchor={sectionAnchor}
            tableName={tableName}
            odp={odp}
            rows={rows}
            data={data}
            copyValues={copyValues}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  )
}

DataTable.propTypes = {
  // metadata
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
  tableSpec: PropTypes.object.isRequired,

  // boolean checks
  copyValues: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default DataTable
