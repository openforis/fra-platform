import './ResultGrid.scss'
import React from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AxisType } from 'meta/explorer/selection'

import { useExplorerSectionData, useGetExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import Observation from 'client/pages/Explorer/ResultGrid/Observation/Observation'

import { useAxisValues } from './hooks/useAxisValues'
import { useCombinations } from './hooks/useCombinations'
import { useCountryEntries } from './hooks/useCountryEntries'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'
import { useRenderLabel } from './hooks/useRenderLabel'
import { CountryEntry } from './types'

const _getCombinationStringValue = <T extends string = string>(value: string | CountryEntry): T => {
  if (typeof value === 'string') return value as T
  if (!Objects.isEmpty(value?.countryIso)) return value.countryIso as T
  return null
}

export const ResultGrid: React.FC = () => {
  const date = new Date()

  const { tableName } = useExplorerSectionMetadata() ?? {}
  // TODO: cellsExportAlways const { cellsExportAlways = [], tableName } = useExplorerSectionMetadata() ?? {}

  const countryEntries = useCountryEntries()
  const measures = useExplorerMeasures()
  const dimensions = useExplorerDimensions()

  // const measuresExportAlways = Measures.getExportAlways(cellsExportAlways)
  // const dimensionsExportAlways = Dimensions.getExportAlways(cellsExportAlways)

  useGetExplorerSectionData()
  const data = useExplorerSectionData()

  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()

  const axisValues = useAxisValues()
  const { uniquePrimaryX, xCombinations, yCombinations } = useCombinations({ axisValues })
  const gridTemplateColumns = useGridTemplateColumns({ axisValues })

  const renderLabel = useRenderLabel()

  if ([countryEntries, data, dimensions, measures, tableName].some(Objects.isEmpty)) {
    return null
  }

  return (
    <DataGrid className="explorer-result-grid" gridTemplateColumns={gridTemplateColumns}>
      <DataCell gridColumn={`span ${yAxisSelection.length}`} gridRow={`span ${xAxisSelection.length}`} header />
      {xAxisSelection.length === 2 &&
        uniquePrimaryX.map((value, idx) => (
          <DataCell
            key={`${xAxisSelection[0]}-${_getCombinationStringValue(value)}-primary-x-variable-header`}
            className="header-top"
            gridColumn={`span ${axisValues[xAxisSelection[1]].length}`}
            header
            lastCol={idx === uniquePrimaryX.length - 1}
          >
            {renderLabel({ axisType: xAxisSelection[0], value })}
          </DataCell>
        ))}

      {xCombinations.map((combination, idx) => (
        <DataCell
          key={`${combination.map(_getCombinationStringValue).join('-')}-x-header`}
          className="header-top"
          header
          lastCol={idx === xCombinations.length - 1}
        >
          {renderLabel({
            axisType: xAxisSelection.length === 2 ? xAxisSelection[1] : xAxisSelection[0],
            value: combination[xAxisSelection.length - 1],
          })}
        </DataCell>
      ))}

      {yCombinations.map((rowCombination, idx) => {
        const isLastRow = idx === yCombinations.length - 1
        const rowMap = Object.fromEntries(yAxisSelection.map((axis, i) => [axis, rowCombination[i]])) as Record<
          AxisType,
          string | CountryEntry
        >

        return (
          <React.Fragment key={`${rowCombination.map(_getCombinationStringValue).join('-')}-fragment`}>
            {yAxisSelection.map((axisType, i) => (
              <DataCell
                key={`${axisType}-${_getCombinationStringValue(rowCombination[i])}-header`}
                header
                lastCol={i === yAxisSelection.length - 1}
                lastRow={isLastRow}
              >
                {renderLabel({ axisType, value: rowMap[axisType] })}
              </DataCell>
            ))}

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
                  lastRow={isLastRow}
                  measureName={measureName}
                  tableName={tableName}
                />
              )
            })}
          </React.Fragment>
        )
      })}

      <DataCell gridColumn="1/-1" noBorder>
        &copy; FRA {`${date.getFullYear()}`}
      </DataCell>
    </DataGrid>
  )
}

export default ResultGrid
