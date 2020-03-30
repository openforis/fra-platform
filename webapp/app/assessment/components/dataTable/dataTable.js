import './dataTable.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as ObjectUtils from '@common/objectUtils'
import { isPrintingMode, isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import Table from '@webapp/app/assessment/components/dataTable/table'
import Chart from '@webapp/app/assessment/components/dataTable/chart'
import GenerateValues from '@webapp/app/assessment/components/dataTable/generateValues'
import useI18n from '@webapp/components/hooks/useI18n'
import useDataTableFetch from '@webapp/app/assessment/components/dataTable/useDataTableFetch'

const DataTable = props => {
  const { assessmentType, sectionName, sectionAnchor, tableSpec, disabled } = props

  const {
    name: tableName,
    rows,
    secondary,
    getSectionData,
    isSectionDataEmpty,
    odp,
    showOdpChart,
    canGenerateValues,
    updateTableDataCell,
  } = tableSpec

  useDataTableFetch(assessmentType, sectionName, tableName)
  const i18n = useI18n()
  const data = useSelector(getSectionData(assessmentType, sectionName, tableName))
  const dataEmpty = useSelector(isSectionDataEmpty(assessmentType, sectionName, tableName))
  const generateValues = useSelector(
    state => odp && !disabled && ObjectUtils.isFunction(canGenerateValues) && canGenerateValues(state)
  )

  if (!data) {
    return null
  }

  return (
    <>
      {showOdpChart && (!isPrintingMode() || (!isPrintingOnlyTables() && !dataEmpty)) && (
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

      {generateValues && (
        <GenerateValues
          assessmentType={assessmentType}
          sectionName={sectionName}
          tableName={tableName}
          rows={rows}
          data={data}
        />
      )}

      <div className={`fra-table__container${secondary ? ' fra-secondary-table__wrapper' : ''}`}>
        <div className="fra-table__scroll-wrapper">
          <Table
            assessmentType={assessmentType}
            sectionName={sectionName}
            sectionAnchor={sectionAnchor}
            tableName={tableName}
            odp={odp}
            rows={rows}
            data={data}
            disabled={disabled}
            updateTableDataCell={updateTableDataCell}
            secondary={secondary}
          />
        </div>
      </div>
    </>
  )
}

DataTable.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
  tableSpec: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default DataTable
