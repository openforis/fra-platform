import './ResultGrid.scss'
import React from 'react'
import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { Axis, AxisType } from 'meta/explorer/selection'
import { Objects } from 'utils/objects'

import { useGetExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import { useHideGrid } from 'client/pages/Explorer/hooks/useHideGrid'
import MeasureTitle from 'client/pages/Explorer/ResultGrid/MeasureTitle/MeasureTitle'
import Observation from 'client/pages/Explorer/ResultGrid/Observation/Observation'
import { CountryEntry } from 'client/pages/Explorer/ResultGrid/types'
import { ExplorerGridProps } from 'client/pages/Explorer/types'

import { useDeferredGridData } from './hooks/useDeferredGridData'
import { useRenderLabel } from './hooks/useRenderLabel'
import { useTrackFirstColRowWidth } from './hooks/useTrackFirstColRowWidth'
import Instructions from './Instructions/Instructions'

const _getCombinationStringValue = <T extends string = string>(value: string | CountryEntry): T => {
  if (typeof value === 'string') return value as T
  if (!Objects.isEmpty(value?.countryIso)) return value.countryIso as T
  return null
}

export const ResultGrid: React.FC<ExplorerGridProps> = (props: ExplorerGridProps) => {
  const { gridRef } = props
  const date = new Date()

  const { tableName } = useExplorerSectionMetadata() ?? {}

  useGetExplorerSectionData()
  const {
    axisValues,
    cellsExportAlways,
    cellsExportAlwaysAxis,
    countryAxis,
    countryOptionFields,
    data,
    gridTemplateColumns,
    uniquePrimaryX,
    xAxisSelection,
    xCombinations,
    yAxisSelection,
    yCombinations,
  } = useDeferredGridData()
  const renderLabel = useRenderLabel()

  const xAxisVariableCount = xAxisSelection.length
  const yAxisVariableCount = yAxisSelection.length

  const hideGrid = useHideGrid()

  useTrackFirstColRowWidth({ gridRef, gridTemplateColumns, hideGrid, xAxisSelection, yAxisSelection })

  if (hideGrid) return <Instructions />

  return (
    <DataGrid ref={gridRef} className="explorer-result-grid" gridTemplateColumns={gridTemplateColumns}>
      <DataCell
        className="corner-cell"
        firstCol
        gridColumn={`span ${yAxisVariableCount}`}
        gridRow={`span ${xAxisVariableCount}`}
        header
      />

      {countryAxis === Axis.y &&
        countryOptionFields.map((field) => (
          <DataCell
            key={`${field.key}-country-option-header`}
            className="country-field-x-header"
            gridRow="span 2"
            header
          >
            {field.label}
          </DataCell>
        ))}
      {/* Cells export always on the X axis - Headers */}
      {!Objects.isEmpty(cellsExportAlways) &&
        cellsExportAlwaysAxis === Axis.x &&
        cellsExportAlways.map(({ dimensionName, measureName }) => {
          return (
            <DataCell
              key={`${measureName}-${dimensionName}-x-cell-export-always-header`}
              className="export-always-x-header"
              gridRow="span 2"
              header
            >
              <MeasureTitle measureName={measureName} />
            </DataCell>
          )
        })}
      {/*  Render only the primary X axis variable headers if multiple selected */}
      {xAxisVariableCount === 2 &&
        uniquePrimaryX.map((value, idx) => {
          const axisType = xAxisSelection[0]
          return (
            <DataCell
              key={`${axisType}-${_getCombinationStringValue(value)}-primary-x-variable-header`}
              className={classNames('primary-x-header', { 'country-header': axisType === AxisType.countries })}
              gridColumn={`span ${axisValues[xAxisSelection[1]].length}`}
              header
              lastCol={idx === uniquePrimaryX.length - 1}
            >
              {renderLabel({ axisType, value })}
            </DataCell>
          )
        })}

      {xCombinations.map((combination, idx) => {
        const isPrimaryVariable = xAxisVariableCount === 1
        const axisType = xAxisSelection[isPrimaryVariable ? 0 : 1]
        return (
          <DataCell
            key={`${combination.map(_getCombinationStringValue).join('-')}-x-header`}
            className={classNames(
              { 'primary-x-header': isPrimaryVariable },
              { 'secondary-x-header': !isPrimaryVariable },
              { 'country-header': axisType === AxisType.countries }
            )}
            header
            lastCol={idx === xCombinations.length - 1}
          >
            {renderLabel({
              // If there are two X variables selected, render only the secondary variable header
              axisType,
              value: combination[xAxisVariableCount - 1],
            })}
          </DataCell>
        )
      })}

      {countryAxis === Axis.x &&
        countryOptionFields.map((field) => (
          <React.Fragment key={`${field.key}-country-option-row`}>
            <DataCell firstCol gridColumn="span 2" header>
              {field.label}
            </DataCell>
            {xCombinations.map((colCombination, colIdx) => {
              const countryEntry = colCombination[0] as CountryEntry
              return (
                <DataCell
                  key={`${countryEntry.countryIso}-${field.key}-country-option`}
                  className="observation"
                  lastCol={colIdx === xCombinations.length - 1}
                >
                  {field.getValue(countryEntry)}
                </DataCell>
              )
            })}
          </React.Fragment>
        ))}

      {/* Cells export always on the Y axis */}
      {!Objects.isEmpty(cellsExportAlways) &&
        cellsExportAlwaysAxis === Axis.y &&
        cellsExportAlways.map(({ dimensionName, measureName }) => {
          const countries = axisValues[AxisType.countries]
          return (
            <React.Fragment key={`${measureName}-${dimensionName}-cell-export-always`}>
              <DataCell firstCol gridColumn="span 2" header>
                <MeasureTitle measureName={measureName} />
              </DataCell>

              {countries.map(({ countryIso }, colIdx) => {
                return (
                  <Observation
                    key={`${countryIso}-${measureName}-${dimensionName}`}
                    countryIso={countryIso}
                    data={data}
                    dimensionName={dimensionName}
                    lastCol={colIdx === countries.length - 1}
                    measureName={measureName}
                    tableName={tableName}
                  />
                )
              })}
            </React.Fragment>
          )
        })}

      {yCombinations.map((rowCombination, rowIdx) => {
        const numSecondaryYRows = yAxisVariableCount === 2 ? axisValues[yAxisSelection[1]].length : 1
        const isPrimaryVariableStart = yAxisVariableCount === 2 && rowIdx % numSecondaryYRows === 0
        const lastRow = rowIdx === yCombinations.length - 1
        const isPrimaryHeaderLastRow = isPrimaryVariableStart && yCombinations.length - numSecondaryYRows === rowIdx
        const primaryVariable = rowCombination[0]
        const secondaryVariable = rowCombination[1]

        const rowMap = Object.fromEntries(yAxisSelection.map((axis, i) => [axis, rowCombination[i]])) as Record<
          AxisType,
          string | CountryEntry
        >

        return (
          <React.Fragment key={`${rowCombination.map(_getCombinationStringValue).join('-')}-fragment`}>
            {isPrimaryVariableStart && (
              <DataCell
                key={`${yAxisSelection[0]}-${_getCombinationStringValue(primaryVariable)}-header`}
                className={classNames({ 'country-header': yAxisSelection[0] === AxisType.countries })}
                firstCol
                gridRow={`span ${numSecondaryYRows}`}
                header
                lastRow={isPrimaryHeaderLastRow}
              >
                {renderLabel({
                  axisType: yAxisSelection[0],
                  value: primaryVariable,
                })}
              </DataCell>
            )}

            <DataCell
              key={`${rowCombination.map(_getCombinationStringValue).join('-')}-y-header`}
              className={classNames({
                'country-header': yAxisSelection[yAxisVariableCount - 1] === AxisType.countries,
                'secondary-y-header': yAxisVariableCount === 2,
              })}
              firstCol={yAxisVariableCount === 1}
              header
              lastRow={lastRow}
            >
              {renderLabel({
                axisType: yAxisSelection[yAxisVariableCount - 1],
                value: yAxisVariableCount === 2 ? secondaryVariable : primaryVariable,
              })}
            </DataCell>

            {countryAxis === Axis.y &&
              countryOptionFields.map((field) => {
                const countryEntry = rowMap[AxisType.countries] as CountryEntry

                return (
                  <DataCell
                    key={`${countryEntry.countryIso}-${field.key}-country-option`}
                    className="observation"
                    lastRow={lastRow}
                  >
                    {field.getValue(countryEntry)}
                  </DataCell>
                )
              })}

            {/* Cells export always on the X axis - Observations */}
            {!Objects.isEmpty(cellsExportAlways) &&
              cellsExportAlwaysAxis === Axis.x &&
              cellsExportAlways.map(({ dimensionName, measureName }) => {
                const countryIso = _getCombinationStringValue<CountryIso>(rowMap[AxisType.countries])

                return (
                  <Observation
                    key={`${countryIso}-${measureName}-${dimensionName}`}
                    countryIso={countryIso}
                    data={data}
                    dimensionName={dimensionName}
                    lastRow={lastRow}
                    measureName={measureName}
                    tableName={tableName}
                  />
                )
              })}

            {xCombinations.map((colCombination, colIdx) => {
              const colMap = Object.fromEntries(xAxisSelection.map((axis, i) => [axis, colCombination[i]])) as Record<
                AxisType,
                string | CountryEntry
              >
              const countryIso = _getCombinationStringValue<CountryIso>(
                colMap[AxisType.countries] ?? rowMap[AxisType.countries]
              )
              const measureName = _getCombinationStringValue(colMap[AxisType.measures] ?? rowMap[AxisType.measures])
              const dimensionName = _getCombinationStringValue(
                colMap[AxisType.dimensions] ?? rowMap[AxisType.dimensions]
              )

              return (
                <Observation
                  key={`${countryIso}-${measureName}-${dimensionName}-observation`}
                  countryIso={countryIso}
                  data={data}
                  dimensionName={dimensionName}
                  lastCol={colIdx === xCombinations.length - 1}
                  lastRow={lastRow}
                  measureName={measureName}
                  tableName={tableName}
                />
              )
            })}
          </React.Fragment>
        )
      })}

      <DataCell firstCol noBorder>
        &copy; FRA {`${date.getFullYear()}`}
      </DataCell>
    </DataGrid>
  )
}

export default ResultGrid
