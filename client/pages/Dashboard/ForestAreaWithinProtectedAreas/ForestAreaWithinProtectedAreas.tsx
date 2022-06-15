import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@core/utils'
import { ChartOptions } from 'chart.js'

import { Areas } from '@meta/area'
import { TableNames } from '@meta/assessment'
import { TableDatas } from '@meta/data'

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
  const tableNamePrimary = isIsoCountry ? TableNames.forestAreaWithinProtectedAreas : TableNames.valueAggregate
  const tableNameSecondary = isIsoCountry ? TableNames.extentOfForest : TableNames.valueAggregate
  const variables = ['forest_area_within_protected_areas', 'forestArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableNamePrimary, tableNameSecondary],
    variables,
  })

  if (!loaded) {
    return null
  }

  const props = {
    colName: column,
    countryIso,
    data: tableData,
  }

  const forestArea = Number(
    TableDatas.getDatum({ ...props, tableName: tableNameSecondary, variableName: 'forestArea' })
  )
  const forestAreaWithinProtectedAreas = Number(
    TableDatas.getDatum({ ...props, tableName: tableNamePrimary, variableName: 'forest_area_within_protected_areas' })
  )

  const primaryForestAsPercentage = Numbers.mul(100, Numbers.div(forestAreaWithinProtectedAreas, forestArea)).toNumber()

  const data = {
    datasets: [
      {
        data: [Numbers.sub(100, primaryForestAsPercentage).toNumber(), primaryForestAsPercentage],
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
