import './ResultsTable.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Objects } from '@utils/objects'

import { Areas, CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { Unit } from '@meta/dataExport'

import { useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/metadata'
import { useDataExportCountries, useDataExportSelection } from '@client/store/ui/dataExport'
import ButtonTableExport from '@client/components/ButtonTableExport'
import { convertValue, formatValue, getColumnLabelKeys } from '@client/pages/DataExport/utils'

import RowFooter from './RowFooter'
import Title from './Title'
import { useFetchResults } from './useFetchResults'

const ResultsTable: React.FC<{ tableName: string }> = ({ tableName }) => {
  const i18n = useTranslation()
  const { assessmentName, cycleName, sectionName } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    sectionName: string
  }>()

  const cycle = useCycle()
  const selection = useDataExportSelection(sectionName)
  const countries = useDataExportCountries()
  const tableSections = useTableSections({ sectionName })

  const { tables } = tableSections.find((tableSection) => tableSection.tables.find((table) => table.props.dataExport))
  const table = tables.find((table) => table.props.dataExport)
  const baseUnit = table?.props?.unit
  const columns = selection.sections[sectionName].columns ?? []

  const columnsAlwaysExport = table?.props?.columnsExportAlways[cycle.uuid] ?? []
  const columnsResults = [...columnsAlwaysExport, ...columns]
  const { variables } = selection.sections[sectionName]

  const tableRef = useRef(null)
  const [exportDisabled, setExportDisabled] = useState<boolean>(true)
  const initialUnits: Record<string, Unit> = {}
  variables.forEach((variable) => {
    initialUnits[variable] = baseUnit
  })
  const [units, setUnits] = useState<Record<string, Unit>>(initialUnits)
  const { results, resultsLoading } = useFetchResults({
    columnsAlwaysExport,
    tableName,
    sectionName,
    assessmentName,
    cycleName,
  })

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

  useEffect(() => {
    variables.forEach((variable) => {
      if (!units[variable]) onUnitChange(baseUnit, variable)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables])

  if (Objects.isEmpty(tableSections)) return null

  return (
    <div className="fra-table__container results-table">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport
          tableRef={tableRef}
          filename={`${assessmentName}-${sectionName}`}
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
                    {getColumnLabelKeys(String(column), sectionName, assessmentName).map((key) => `${i18n.t(key)} `)}
                  </th>
                ))
              )}
            </tr>
          </thead>

          <tbody>
            {selection.countryISOs.map((countryIso) => {
              const country = countries.find((country) => country.countryIso === countryIso)
              const label = i18n.t(Areas.getTranslationKey(countryIso as CountryIso))
              const { deskStudy } = country.props

              return (
                <tr key={label}>
                  <th className="fra-table__category-cell" colSpan={1}>
                    {i18n.t(label)} {deskStudy && `(${i18n.t('assessment.deskStudy')})`}
                  </th>
                  {variables.map((variable) =>
                    columnsResults.map((column) => {
                      const { columnKey, value } = formatValue(
                        assessmentName,
                        cycleName,
                        String(column),
                        countryIso as CountryIso,
                        results,
                        tableName,
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
