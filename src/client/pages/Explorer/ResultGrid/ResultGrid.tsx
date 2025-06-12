import './ResultGrid.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Dimensions } from 'meta/measurement/dimensions'
import { Measures } from 'meta/measurement/measures'

import { useCountries } from 'client/store/area/hooks/countries'
import { useExplorerSectionData, useGetExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import MeasureTitle from 'client/pages/Explorer/ResultGrid/MeasureTitle/MeasureTitle'
import Observation from 'client/pages/Explorer/ResultGrid/Observation/Observation'

import { useCountryEntries } from './hooks/useCountryEntries'

const ResultGrid: React.FC = () => {
  const date = new Date()
  const { t } = useTranslation()
  const countriesAll = useCountries()

  const { cellsExportAlways = [], tableName } = useExplorerSectionMetadata() ?? {}
  const countryEntries = useCountryEntries()
  const measures = useExplorerMeasures() ?? []
  const dimensions = useExplorerDimensions() ?? []

  const measuresExportAlways = Measures.getExportAlways(cellsExportAlways)
  const dimensionsExportAlways = Dimensions.getExportAlways(cellsExportAlways)

  useGetExplorerSectionData()
  const data = useExplorerSectionData()

  const gridTemplateColumns = `minmax(160px, 240px) repeat(${
    measures.length * dimensions.length + cellsExportAlways.length
  }, 1fr)`

  if ([countryEntries, data, dimensions, measures, tableName].some(Objects.isEmpty)) {
    return null
  }

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

      {countryEntries.map(({ countryIso, label }, idx) => {
        const country = countriesAll.find((c) => c.countryIso === countryIso)
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

export default ResultGrid
