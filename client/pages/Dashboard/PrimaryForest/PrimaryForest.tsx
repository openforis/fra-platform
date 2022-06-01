import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions } from 'chart.js'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { ChartColors, commonOptions } from '../utils/preferences'

const PrimaryForest = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()
  const section = 'primaryForest'
  const column = '2020'
  const tableNamePrimary = 'specificForestCategories'
  const tableNameSecondary = 'extentOfForest'
  const variables = ['primary_forest', 'totalLandArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableNamePrimary, tableNameSecondary],
    variables,
  })

  if (!loaded) {
    return null
  }

  const otherForest = +tableData[countryIso][tableNameSecondary][column].totalLandArea.raw
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
      i18n.t('statisticalFactsheets.rowName.primaryForest'),
      i18n.t('statisticalFactsheets.rowName.otherForest'),
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
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {primaryForestAsPercentage ? (
        <Chart type="pie" data={data} options={options} />
      ) : (
        <h6 className="header">{i18n.t('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default PrimaryForest
