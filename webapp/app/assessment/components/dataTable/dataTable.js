import './dataTable.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as ObjectUtils from '@common/objectUtils'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { useI18n, usePrintView } from '@webapp/components/hooks'

import Table from './table'
import Chart from './chart'
import GenerateValues from './generateValues'
import { getRowsSliced } from './printUtils'

const DataTable = (props) => {
  const { assessmentType, sectionName, sectionAnchor, tableSpec, disabled } = props

  const tableName = tableSpec[SectionSpec.KEYS_TABLE.name]
  const rows = tableSpec[SectionSpec.KEYS_TABLE.rows]
  const getSectionData = tableSpec[SectionSpec.KEYS_TABLE.getSectionData]
  const isSectionDataEmpty = tableSpec[SectionSpec.KEYS_TABLE.isSectionDataEmpty]
  const odp = tableSpec[SectionSpec.KEYS_TABLE.odp]
  const showOdpChart = tableSpec[SectionSpec.KEYS_TABLE.showOdpChart]
  const canGenerateValues = tableSpec[SectionSpec.KEYS_TABLE.canGenerateValues]
  const breakPointsColsPrint = tableSpec[SectionSpec.KEYS_TABLE.print][SectionSpec.KEYS_TABLE_PRINT.colBreakPoints]

  const i18n = useI18n()
  const data = useSelector(getSectionData(assessmentType, sectionName, tableName))
  const dataEmpty = useSelector(isSectionDataEmpty(assessmentType, sectionName, tableName))
  const generateValues = useSelector(
    (state) => odp && !disabled && ObjectUtils.isFunction(canGenerateValues) && canGenerateValues(state)
  )
  const [printView] = usePrintView()

  if (!data) {
    return null
  }

  return (
    <>
      {showOdpChart && (!printView || !dataEmpty) && (
        <>
          <Chart
            fra={data}
            trends={rows
              .filter((row) => !!row.chartProps)
              .map((row) => ({
                name: row.variableName,
                label: i18n.t(row.chartProps.labelKey),
                color: row.chartProps.color,
              }))}
          />
          <div className="page-break" />
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

      {printView && breakPointsColsPrint.length > 0 ? (
        breakPointsColsPrint.map((breakPoint, breakPointIdx) => {
          const rowsSliced = getRowsSliced(breakPointsColsPrint, breakPointIdx, rows)
          return (
            <Table
              key={breakPoint}
              assessmentType={assessmentType}
              sectionName={sectionName}
              sectionAnchor={sectionAnchor}
              tableSpec={tableSpec}
              rows={rowsSliced}
              data={data}
              disabled={disabled}
            />
          )
        })
      ) : (
        <Table
          assessmentType={assessmentType}
          sectionName={sectionName}
          sectionAnchor={sectionAnchor}
          tableSpec={tableSpec}
          rows={rows}
          data={data}
          disabled={disabled}
        />
      )}
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
