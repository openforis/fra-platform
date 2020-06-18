import './resultsTable.less'
import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { UnitSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { getValue, getI18nKey, valueConverted, getTimeStamp } from '../../utils/format'

const ResultsTableTitle = (props) => {
  const {
    baseUnit,
    selection: {
      variable: { label, labelParam },
    },
    resultsLoading,
    setSelected,
  } = props

  const i18n = useI18n()
  const getUnitText = (unit) => (unit ? <span>{` (${unit})`}</span> : '')

  return resultsLoading ? (
    i18n.t('description.loading')
  ) : (
    <>
      {i18n.t(label, labelParam)}
      {Object.keys(UnitSpec.factors).includes(baseUnit) ? (
        <>
          <span> ( </span>
          <select className="select-s" defaultValue={baseUnit} onChange={(event) => setSelected(event.target.value)}>
            <option value={baseUnit}>{baseUnit}</option>
            {Object.keys(UnitSpec.factors[baseUnit]).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <span> )</span>
        </>
      ) : (
        getUnitText(baseUnit)
      )}
    </>
  )
}

ResultsTableTitle.propTypes = {
  baseUnit: PropTypes.string.isRequired,
  selection: PropTypes.object.isRequired,
  resultsLoading: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
}

const ResultsTable = (props) => {
  const { results, selection, columns, resultsLoading } = props
  const filteredColumns = columns.filter((column) => selection.columns.map(({ param }) => param).includes(column))

  const { assessmentType, section } = useParams()
  const i18n = useI18n()
  const tableRef = useRef(null)
  const [exportDisabled, setExportDisabled] = useState(true)

  // Unit consts
  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, section)
  const baseUnit = tableSpec.unit
  const [unit, setUnit] = useState(baseUnit)

  const onUnitChange = (value) => {
    setExportDisabled(true)
    setUnit(value)
  }

  useLayoutEffect(() => {
    setExportDisabled(false)
  }, [unit])

  useLayoutEffect(() => {
    setExportDisabled(resultsLoading)
  }, [resultsLoading])

  return (
    <div className="results-table">
      <ButtonTableExport tableRef={tableRef} filename={`${assessmentType}-${section}`} disabled={exportDisabled} />
      <table ref={tableRef} className="fra-table data-table">
        <thead>
          <tr>
            <th className="fra-table__header-cell-left" colSpan="1" rowSpan="2">
              &nbsp;
            </th>
            <th className="fra-table__header-cell" colSpan={selection.columns.length + 1}>
              <ResultsTableTitle
                baseUnit={baseUnit}
                selected={unit}
                setSelected={onUnitChange}
                resultsLoading={resultsLoading}
                selection={selection}
              />
            </th>
          </tr>
          <tr>
            {filteredColumns.map((column) => (
              <th key={column} className="fra-table__header-cell">
                {getI18nKey(column, section).map((key) => `${i18n.t(key)} `)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selection.countries.map(({ param: countryIso, label, deskStudy }) => (
            <tr key={label}>
              <th className="fra-table__category-cell" colSpan="1">
                {i18n.t(label)} {deskStudy && `(${i18n.t('assessment.deskStudy')})`}
              </th>
              {filteredColumns.map((column) => {
                const { columnKey, value } = getValue(column, countryIso, results, section)

                return (
                  <td key={`${countryIso}${columnKey || column}`} className="fra-table__cell">
                    <div className="number-input__readonly-view">{valueConverted(value, baseUnit, unit)}</div>
                  </td>
                )
              })}
            </tr>
          ))}
          <tr>
            <td className="fra-table__validation-cell">
              <div className="fra-table__validation-container copyright">
                &copy; FRA {`${new Date().getFullYear()}`}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span className="timestamp">{`${getTimeStamp()}`}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ResultsTable.defaultProps = {
  results: null,
}

ResultsTable.propTypes = {
  resultsLoading: PropTypes.bool.isRequired,
  results: PropTypes.object,
  columns: PropTypes.array.isRequired,
  selection: PropTypes.object.isRequired,
}

export default ResultsTable
