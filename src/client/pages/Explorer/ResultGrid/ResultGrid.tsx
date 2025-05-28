import './ResultGrid.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { RecordAssessmentDatas } from 'meta/data'
import { Measures } from 'meta/measurement/measures'

import { useCountries } from 'client/store/area'
import { useExplorerSectionData, useGetExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerCountries } from 'client/store/explorer/filter/hooks/countries'
import { useExplorerDimensions } from 'client/store/explorer/filter/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/filter/hooks/measures'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'

const ResultGrid: React.FC = () => {
  const { assessmentName, cycleName } = useSectionRouteParams()
  const date = new Date()
  const { t } = useTranslation()
  const countriesAll = useCountries()

  const { tableName } = useExplorerSectionMetadata() ?? {}
  const countryISOs = useExplorerCountries() ?? []
  const measures = useExplorerMeasures() ?? []
  const dimensions = useExplorerDimensions() ?? []

  useGetExplorerSectionData()
  const data = useExplorerSectionData()

  const gridTemplateColumns = `minmax(160px, 240px) repeat(${measures.length * dimensions.length}, 1fr)`

  if ([countryISOs, data, dimensions, measures, tableName].some(Objects.isEmpty)) {
    return null
  }

  return (
    <DataGrid className="explorer-result-grid" gridTemplateColumns={gridTemplateColumns}>
      <DataCell gridRow="span 2" header />
      {measures.map((measure, mIdx) => (
        <DataCell
          key={measure}
          className="header-top"
          gridColumn={`span ${dimensions.length}`}
          header
          lastCol={mIdx === measures.length - 1}
        >
          {/* TODO: Get measure label and add unit conversion select */}
          {measure}
        </DataCell>
      ))}
      {measures.map((measure, mIdx) =>
        dimensions.map((dimension, dIdx) => (
          <DataCell
            key={`${measure}-${dimension}`}
            className="header-top"
            header
            lastCol={mIdx === measures.length - 1 && dIdx === dimensions.length - 1}
          >
            {/* TODO: Get dimension label */}
            {dimension}
          </DataCell>
        ))
      )}

      {countryISOs?.map((countryIso, cIdx) => {
        const country = countriesAll.find((c) => c.countryIso === countryIso)
        const label = t(Areas.getTranslationKey(countryIso))
        const { deskStudy } = country.props
        const lastRow = cIdx === countryISOs.length - 1

        return (
          <React.Fragment key={countryIso}>
            <DataCell header lastRow={lastRow}>
              {deskStudy ? `${label} (${t('assessment.deskStudy')})` : label}
            </DataCell>
            {measures.map((measure, mIdx) =>
              dimensions.map((dimension, dIdx) => {
                const value = RecordAssessmentDatas.getDatum({
                  assessmentName,
                  colName: dimension,
                  countryIso,
                  cycleName,
                  data,
                  tableName,
                  variableName: Measures.measureNameToVariableName(measure),
                })
                return (
                  <DataCell
                    key={`obs-${measure}-${dimension}-${countryIso}`}
                    className="observation"
                    lastCol={mIdx === measures.length - 1 && dIdx === dimensions.length - 1}
                    lastRow={lastRow}
                  >
                    {/* TODO: Add value conversion and formatting */}
                    {value}
                  </DataCell>
                )
              })
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
