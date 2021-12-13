import './ResultsTable.scss'
import React, { useEffect, useRef, useState } from 'react'

import { Areas } from '@core/country'
import { SectionSpecs, Unit } from '@webapp/sectionSpec'
import { useAssessmentType } from '@webapp/store/app'
import { useDataExportCountries, useDataExportSelection } from '@webapp/store/page/dataExport'
import { useI18n, useParamSection } from '@webapp/hooks'
import { convertValue, formatValue, getColumnLabelKeys } from '@webapp/components/Assessment/DataExport/utils'

import ButtonTableExport from '@webapp/components/ButtonTableExport'
import Title from './Title'
import RowFooter from './RowFooter'
import { useFetchResults } from './useFetchResults'

const ResultsTable: React.FC = () => {
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const assessmentSection = useParamSection()
  const selection = useDataExportSelection(assessmentSection)
  const countries = useDataExportCountries()

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const baseUnit = tableSpec.unit
  const columns = tableSpec.columnsExport ?? []
  const filteredColumns = columns.filter((column) =>
    selection.sections[assessmentSection].columns.includes(String(column))
  )
  const columnsAlwaysExport = tableSpec.columnsExportAlways ?? []
  const columnsResults = [...columnsAlwaysExport, ...filteredColumns]
  const { variables } = selection.sections[assessmentSection]

  const tableRef = useRef(null)
  const [exportDisabled, setExportDisabled] = useState<boolean>(true)
  const initialUnits: Record<string, Unit> = {}
  variables.forEach((variable) => {
    initialUnits[variable] = baseUnit
  })
  const [units, setUnits] = useState<Record<string, Unit>>(initialUnits)
  const { results, resultsLoading } = useFetchResults({ columnsAlwaysExport, assessmentSection, assessmentType })

  const onUnitChange = (value: Unit, variable: string) => {
    setExportDisabled(true)
    setUnits({ ...units, [variable]: value })
  }

  useEffect(() => {
    setExportDisabled(false)
  }, [units])

  useEffect(() => {
    setExportDisabled(resultsLoading)
  }, [resultsLoading])

  return (
    <div className="fra-table__container results-table">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport
          tableRef={tableRef}
          filename={`${assessmentType}-${assessmentSection}`}
          disabled={exportDisabled}
        />

        <table ref={tableRef} className="fra-table data-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left" rowSpan={2}>
                &nbsp;
              </th>
              {variables.map((variable) => (
                <th key={variable} className="fra-table__header-cell" colSpan={columnsResults.length}>
                  <Title
                    baseUnit={baseUnit}
                    variable={variable}
                    onUnitChange={onUnitChange}
                    resultsLoading={resultsLoading}
                  />
                </th>
              ))}
            </tr>
            <tr>
              {variables.map((_) =>
                columnsResults.map((column) => (
                  <th key={column} className="fra-table__header-cell">
                    {getColumnLabelKeys(String(column), assessmentSection, assessmentType).map(
                      (key) => `${i18n.t(key)} `
                    )}
                  </th>
                ))
              )}
            </tr>
          </thead>

          <tbody>
            {selection.countryISOs.map((countryIso) => {
              const country = countries.find((country) => country.countryIso === countryIso)
              const label = Areas.getListName(countryIso, i18n)
              const deskStudy = country.assessment[assessmentType]?.deskStudy

              return (
                <tr key={label}>
                  <th className="fra-table__category-cell" colSpan={1}>
                    {i18n.t(label)} {deskStudy && `(${i18n.t('assessment.deskStudy')})`}
                  </th>
                  {variables.map((variable) =>
                    columnsResults.map((column) => {
                      const { columnKey, value } = formatValue(
                        String(column),
                        countryIso,
                        results,
                        assessmentSection,
                        variable
                      )
                      return (
                        <td key={`${countryIso}${columnKey || column}`} className="fra-table__cell">
                          <div className="number-input__readonly-view">
                            {convertValue(value, baseUnit, units[variable])}
                          </div>
                        </td>
                      )
                    })
                  )}
                </tr>
              )
            })}

            <RowFooter />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultsTable
