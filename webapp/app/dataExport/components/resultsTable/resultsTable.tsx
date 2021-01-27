import './resultsTable.less'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import { UnitSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import {
  getValue,
  getI18nKey,
  valueConverted,
  getTimeStamp,
  getCustomVariableI18nMappings,
  getUnitI18nMappings,
} from '../../utils/format'

type OwnResultsTableTitleProps = {
  baseUnit?: string
  selection: any
  resultsLoading: boolean
  setSelected: (...args: any[]) => any
}
// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'ResultsTableTitleProps' circularly ref... Remove this comment to see the full error message
type ResultsTableTitleProps = OwnResultsTableTitleProps & typeof ResultsTableTitle.defaultProps
// @ts-expect-error ts-migrate(7022) FIXME: 'ResultsTableTitle' implicitly has type 'any' beca... Remove this comment to see the full error message
const ResultsTableTitle = (props: ResultsTableTitleProps) => {
  const {
    baseUnit,
    selection: {
      variable: { label, labelParam, labelPrefixKey },
    },
    resultsLoading,
    setSelected,
  } = props
  const i18n = useI18n()
  return resultsLoading ? (
    (i18n as any).t('description.loading')
  ) : (
    <>
      <span>
        {labelPrefixKey && `${(i18n as any).t(labelPrefixKey)} `}
        {(i18n as any).t(getCustomVariableI18nMappings(label), labelParam)}
      </span>
      {Object.keys(UnitSpec.factors).includes(baseUnit) ? (
        <>
          <span> (</span>
          <select className="select-s" defaultValue={baseUnit} onChange={(event) => setSelected(event.target.value)}>
            <option value={baseUnit}>{(i18n as any).t(getUnitI18nMappings(baseUnit))}</option>
            {Object.keys(UnitSpec.factors[baseUnit]).map(
              (unit) =>
                unit !== baseUnit && (
                  <option key={unit} value={unit}>
                    {(i18n as any).t(getUnitI18nMappings(unit))}
                  </option>
                )
            )}
          </select>
          <span>)</span>
        </>
      ) : (
        <span>{baseUnit ? ` (${(i18n as any).t(`unit.${baseUnit}`)})` : ''}</span>
      )}
    </>
  )
}
ResultsTableTitle.defaultProps = {
  baseUnit: null,
}
type OwnResultsTableProps = {
  resultsLoading: boolean
  results?: any
  columns: any[]
  columnsAlwaysExport: any[]
  selection: any
}
// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'ResultsTableProps' circularly referenc... Remove this comment to see the full error message
type ResultsTableProps = OwnResultsTableProps & typeof ResultsTable.defaultProps
// @ts-expect-error ts-migrate(7022) FIXME: 'ResultsTable' implicitly has type 'any' because i... Remove this comment to see the full error message
const ResultsTable = (props: ResultsTableProps) => {
  const { results, selection, columns, columnsAlwaysExport, resultsLoading } = props
  const filteredColumns = columns.filter((column: any) =>
    selection.columns.map(({ param }: any) => param).includes(column)
  )
  const columnsResults = [...columnsAlwaysExport, ...filteredColumns]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assessmentType' does not exist on type '... Remove this comment to see the full error message
  const { assessmentType, section } = useParams()
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
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'. */}
            <th className="fra-table__header-cell-left" rowSpan="2">
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
                {getI18nKey(column, section, assessmentType).map((key) => `${(i18n as any).t(key)} `)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selection.countries.map(({ param: countryIso, label, deskStudy }: any) => (
            <tr key={label}>
              {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'. */}
              <th className="fra-table__category-cell" colSpan="1">
                {(i18n as any).t(label)} {deskStudy && `(${(i18n as any).t('assessment.deskStudy')})`}
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
