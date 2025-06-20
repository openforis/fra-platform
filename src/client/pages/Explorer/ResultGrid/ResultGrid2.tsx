import './ResultGrid.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AxisType } from 'meta/explorer/selection'
import { DimensionName } from 'meta/measurement/dimension'
import { Dimensions } from 'meta/measurement/dimensions'
import { MeasureName } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

import { useExplorerSectionData, useGetExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'
import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import MeasureTitle from 'client/pages/Explorer/ResultGrid/MeasureTitle/MeasureTitle'
import Observation from 'client/pages/Explorer/ResultGrid/Observation/Observation'

import { useCountryEntries } from './hooks/useCountryEntries'

type ObservationCell = {
  data: Array<MeasureName | DimensionName | CountryIso>
  type: AxisType
}
type ObservationCells = Array<ObservationCell>

const useObservationCells = (): ObservationCells | undefined => {
  const axisSelection = useExplorerAxisSelection()
  const countryISOs = useExplorerCountries()
  const dimensions = useExplorerDimensions()
  const measures = useExplorerMeasures()
  const { tableName } = useExplorerSectionMetadata() ?? {}

  return useMemo<ObservationCells | undefined>(() => {
    if ([countryISOs, dimensions, measures, tableName].some(Objects.isEmpty)) {
      return undefined
    }
    return [...axisSelection.y, ...axisSelection.x].map<ObservationCell>((axis) => {
      let cell: ObservationCell
      if (axis === AxisType.dimensions) cell = { data: dimensions, type: axis }
      if (axis === AxisType.measures) cell = { data: measures, type: axis }
      if (axis === AxisType.countries) cell = { data: countryISOs, type: axis }
      return cell
    })
  }, [axisSelection.x, axisSelection.y, countryISOs, dimensions, measures, tableName])
}

const useGridTemplateColumns = (): string => {
  const axisSelection = useExplorerAxisSelection()
  const countryISOs = useExplorerCountries()
  const dimensions = useExplorerDimensions()
  const measures = useExplorerMeasures()

  return useMemo<string>(() => {
    const length = axisSelection.x.reduce<number>((acc, axis) => {
      let value
      if (axis === AxisType.dimensions) value = dimensions.length
      if (axis === AxisType.countries) value = countryISOs.length
      if (axis === AxisType.measures) value = measures.length
      return acc + value
    }, 0)
    return `minmax(160px, 240px) repeat(${length}, 1fr)`
  }, [axisSelection.x, countryISOs.length, dimensions.length, measures.length])
}

export const ResultGrid2: React.FC = () => {
  const date = new Date()
  const { t } = useTranslation()

  const { cellsExportAlways = [], tableName } = useExplorerSectionMetadata() ?? {}
  const countryEntries = useCountryEntries()
  const measures = useExplorerMeasures()
  const dimensions = useExplorerDimensions()
  const axisSelection = useExplorerAxisSelection()

  const measuresExportAlways = Measures.getExportAlways(cellsExportAlways)
  const dimensionsExportAlways = Dimensions.getExportAlways(cellsExportAlways)

  useGetExplorerSectionData()
  const data = useExplorerSectionData()

  const gridTemplateColumns = useGridTemplateColumns()
  const observationCells = useObservationCells()

  if ([countryEntries, data, dimensions, measures, tableName].some(Objects.isEmpty)) {
    return null
  }

  // return (
  //   <DataGrid className="explorer-result-grid" gridTemplateColumns={gridTemplateColumns}>
  //     {/* // render obervations only if x and y axis length > 0 */}
  //     {axisSelection.x.length > 0 && axisSelection.y.length > 0 && observationCells.map((cell) => {
  //       cell.
  //     })}
  //   </DataGrid>
  // )
  return (
    <DataGrid className="explorer-result-grid" gridTemplateColumns={gridTemplateColumns}>
      <DataCell gridRow="span 2" header />
      {measuresExportAlways.map((measureName, idx) => {
        const dimension = dimensionsExportAlways[idx]
        return (
          <DataCell key={`${measureName}-${dimension}`} className="header-top" gridRow="span 2" header>
            <MeasureTitle measureName={measureName} />
          </DataCell>
        )
      })}
      {measures.map((measureName, mIdx) => (
        <DataCell
          key={measureName}
          className="header-top"
          gridColumn={`span ${dimensions.length}`}
          header
          lastCol={mIdx === measures.length - 1}
        >
          <MeasureTitle measureName={measureName} />
        </DataCell>
      ))}
      {measures.map((measureName, mIdx) =>
        dimensions.map((dimensionName, dIdx) => (
          <DataCell
            key={`${measureName}-${dimensionName}`}
            className="header-top"
            header
            lastCol={mIdx === measures.length - 1 && dIdx === dimensions.length - 1}
          >
            {t(Dimensions.getTName(dimensionName), { defaultValue: dimensionName })}
          </DataCell>
        ))
      )}

      {countryEntries.map((country, idx) => {
        const { countryIso, label } = country
        const { deskStudy } = country?.props ?? {}
        const lastRow = idx === countryEntries.length - 1

        return (
          <React.Fragment key={countryIso}>
            <DataCell header lastRow={lastRow}>
              {deskStudy ? `${label} (${t('assessment.deskStudy')})` : label}
            </DataCell>
            {measuresExportAlways.map((measureName, idx) => {
              const dimensionName = dimensionsExportAlways[idx]
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
            {measures.map((measureName, mIdx) =>
              dimensions.map((dimensionName, dIdx) => (
                <Observation
                  key={`${countryIso}-${measureName}-${dimensionName}`}
                  countryIso={countryIso}
                  data={data}
                  dimensionName={dimensionName}
                  lastCol={mIdx === measures.length - 1 && dIdx === dimensions.length - 1}
                  lastRow={lastRow}
                  measureName={measureName}
                  tableName={tableName}
                />
              ))
            )}
          </React.Fragment>
        )
      })}

      <DataCell gridColumn="1/-1" noBorder>
        &copy; FRA {`${date.getFullYear()}`}
      </DataCell>
    </DataGrid>
  )
}
