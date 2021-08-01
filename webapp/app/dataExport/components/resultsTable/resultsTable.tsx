import './resultsTable.less'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { SectionSpecs, UnitFactors } from '@core/sectionSpec'
import { useI18n } from '@webapp/components/hooks'

import ButtonTableExport from '@webapp/components/buttonTableExport'

import {
  getValue,
  getI18nKey,
  valueConverted,
  getTimeStamp,
  getCustomVariableI18nMappings,
  getUnitI18nMappings,
} from '../../utils/format'

type ResultsTableTitleProps = {
  baseUnit?: string
  selection: any
  resultsLoading: boolean
  setSelected: (...args: any[]) => any
  selected: any
}

const ResultsTableTitle: React.FC<ResultsTableTitleProps> = (props) => {
  const i18n = useI18n()

  const {
    baseUnit,
    selection: {
      variable: { label, labelParam, labelPrefixKey },
    },
    resultsLoading,
    setSelected,
  } = props
  return resultsLoading ? (
    i18n.t('description.loading')
  ) : (
    <>
      <span>
        {labelPrefixKey && `${i18n.t(labelPrefixKey)} `}
        {i18n.t(getCustomVariableI18nMappings(label), labelParam)}
      </span>
      {Object.keys(UnitFactors).includes(baseUnit) ? (
        <>
          <span> (</span>
          <select className="select-s" defaultValue={baseUnit} onChange={(event) => setSelected(event.target.value)}>
            <option value={baseUnit}>{i18n.t(getUnitI18nMappings(baseUnit))}</option>
            {Object.keys(UnitFactors[baseUnit]).map(
              (unit) =>
                unit !== baseUnit && (
                  <option key={unit} value={unit}>
                    {i18n.t(getUnitI18nMappings(unit))}
                  </option>
                )
            )}
          </select>
          <span>)</span>
        </>
      ) : (
        <span>{baseUnit ? ` (${i18n.t(`unit.${baseUnit}`)})` : ''}</span>
      )}
    </>
  )
}
ResultsTableTitle.defaultProps = {
  baseUnit: null,
}

type Props = {
  resultsLoading: boolean
  results?: any
  columns: any[]
  columnsAlwaysExport: any[]
  selection: any
}

const ResultsTable = (props: Props) => {
  const { results, selection, columns, columnsAlwaysExport, resultsLoading }: any = props
  const filteredColumns = columns.filter((column: any) =>
    selection.columns.map(({ param }: any) => param).includes(column)
  )
  const columnsResults = [...columnsAlwaysExport, ...filteredColumns]
  const { assessmentType, section }: any = useParams()
  const i18n = useI18n()
  const tableRef = useRef(null)
  const [exportDisabled, setExportDisabled] = useState(true)
  // Unit consts
  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, section)
  const baseUnit = tableSpec.unit
  const [unit, setUnit] = useState(baseUnit)
  const onUnitChange = (value: any) => {
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
            <th className="fra-table__header-cell-left" rowSpan={2}>
              &nbsp;
            </th>
            <th className="fra-table__header-cell" colSpan={columnsResults.length}>
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
            {columnsResults.map((column) => (
              <th key={column} className="fra-table__header-cell">
                {getI18nKey(column, section, assessmentType).map((key) => `${i18n.t(key)} `)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selection.countries.map(({ param: countryIso, label, deskStudy }: any) => (
            <tr key={label}>
              <th className="fra-table__category-cell" colSpan={1}>
                {i18n.t(label)} {deskStudy && `(${i18n.t('assessment.deskStudy')})`}
              </th>
              {columnsResults.map((column) => {
                const { columnKey, value } = getValue(column, countryIso, results, section, selection.variable.param)
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

export default ResultsTable
