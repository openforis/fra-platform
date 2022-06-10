import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions } from 'chart.js'

import { Areas } from '@meta/area'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { ChartColors, commonOptions } from '../utils/preferences'

const PrimaryForest = () => {
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const section = 'primaryForest'
  const column = '2020'
  const tableNamePrimary = isIsoCountry ? 'specificForestCategories' : 'aggregate'
  const tableNameSecondary = isIsoCountry ? 'extentOfForest' : 'aggregate'
  const variables = ['primary_forest', 'forestArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableNamePrimary, tableNameSecondary],
    variables,
  })

  if (!loaded) {
    return null
  }

  const otherForest = +tableData[countryIso][tableNameSecondary][column].forestArea.raw
  const primaryForest = +tableData[countryIso][tableNamePrimary][column].primary_forest.raw

  const primaryForestAsPercentage = 100 * (primaryForest / otherForest)

  const data = {
    datasets: [
      {
        data: [primaryForestAsPercentage, 100 - primaryForestAsPercentage],
        borderWidth: 0,
        backgroundColor: [ChartColors.green, ChartColors.lightGreen],
        hoverBackgroundColor: [ChartColors.greenHover, ChartColors.lightGreenHover],
        unit: '%',
      },
    ],
    labels: [
      i18n.t<string>('statisticalFactsheets.rowName.primaryForest'),
      i18n.t<string>('statisticalFactsheets.rowName.otherForest'),
    ],
  }

  const options: ChartOptions<any> = {
    ...commonOptions,
    legend: {
      position: 'bottom',
    },
  }

  return (
    <div className="row-s">
      <h3 className="header">{i18n.t<string>(`statisticalFactsheets.${section}.title`)}</h3>
      {primaryForestAsPercentage ? (
        <Chart type="pie" data={data} options={options} />
      ) : (
        <h6 className="header">{i18n.t<string>('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default PrimaryForest
