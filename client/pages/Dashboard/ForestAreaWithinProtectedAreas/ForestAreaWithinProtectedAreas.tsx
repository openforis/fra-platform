import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions } from 'chart.js'

import { Areas } from '@meta/area'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { ChartColors, commonOptions } from '../utils/preferences'

const ForestAreaWithinProtectedAreas = () => {
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const section = 'forestAreaWithinProtectedAreas'
  const column = '2020'
  const tableNamePrimary = isIsoCountry ? 'forestAreaWithinProtectedAreas' : 'aggregate'
  const tableNameSecondary = isIsoCountry ? 'extentOfForest' : 'aggregate'
  const variables = ['forest_area_within_protected_areas', 'forestArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableNamePrimary, tableNameSecondary],
    variables,
  })

  if (!loaded) {
    return null
  }

  const forestArea = +tableData[countryIso][tableNameSecondary][column].forestArea.raw
  const forestAreaWithinProtectedAreas =
    +tableData[countryIso][tableNamePrimary][column].forest_area_within_protected_areas.raw

  const primaryForestAsPercentage = 100 * (forestAreaWithinProtectedAreas / forestArea)

  const data = {
    datasets: [
      {
        data: [100 - primaryForestAsPercentage, primaryForestAsPercentage],
        borderWidth: 0,
        backgroundColor: [ChartColors.green, ChartColors.lightGreen],
        hoverBackgroundColor: [ChartColors.greenHover, ChartColors.lightGreenHover],
        unit: '%',
      },
    ],
    labels: [
      i18n.t<string>('statisticalFactsheets.rowName.forestArea'),
      i18n.t<string>('statisticalFactsheets.rowName.forestAreaWithinProtectedAreas'),
    ],
  }

  const options = {
    ...commonOptions,
    legend: {
      position: 'bottom',
    },
  } as ChartOptions<'pie'>

  return (
    <div className="row-s">
      <h3 className="header">{i18n.t<string>(`statisticalFactsheets.${section}.title`)}</h3>
      {forestAreaWithinProtectedAreas && forestArea ? (
        <Chart type="pie" data={data} options={options} />
      ) : (
        <h6 className="header">{i18n.t<string>('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default ForestAreaWithinProtectedAreas
