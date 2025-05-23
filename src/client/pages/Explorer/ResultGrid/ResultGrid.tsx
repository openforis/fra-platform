import './ResultGrid.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas } from 'meta/area'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountries } from 'client/store/area'
import { useExplorerCountries } from 'client/store/explorer/filter/hooks/countries'
import { useExplorerDimensions } from 'client/store/explorer/filter/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/filter/hooks/measures'
import { useGetRequest } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'

const ResultGrid: React.FC = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const date = new Date()
  const { t } = useTranslation()
  const countriesAll = useCountries()

  const tableName = 'extentOfForest'
  const countryISOs = useExplorerCountries()
  const measures = useExplorerMeasures() ?? []
  const dimensions = useExplorerDimensions() ?? []

  const { data: results = {}, dispatch: fetchData } = useGetRequest(ApiEndPoint.CycleData.Table.tableData(), {
    params: {
      assessmentName,
      columns: dimensions,
      countryIso,
      countryISOs,
      cycleName,
      tableNames: [tableName],
      variables: measures,
    },
  })
  useEffect(() => {
    if (Objects.isEmpty(countryISOs)) return
    if (Objects.isEmpty(measures)) return
    if (Objects.isEmpty(dimensions)) return

    fetchData()
    // eslint-disable-next-line
  }, [countryISOs, dimensions, measures])

  const gridTemplateColumns = `minmax(160px, 240px) repeat(${measures.length * dimensions.length}, 1fr)`

  if (Objects.isEmpty(countryISOs) || Objects.isEmpty(measures) || Objects.isEmpty(dimensions)) return null

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
                  data: results,
                  tableName,
                  variableName: measure,
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
