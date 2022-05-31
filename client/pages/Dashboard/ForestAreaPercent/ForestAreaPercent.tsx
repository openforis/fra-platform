import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions } from 'chart.js'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { ChartColors, commonOptions } from '../utils/preferences'

const ForestAreaPercent = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()
  const section = 'forestAreaPercent'
  const column = '2020'
  const tableName = 'extentOfForest'
  const variables = ['forestArea', 'totalLandArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableName],
    variables,
  })

  if (!loaded) {
    return null
  }

  const forestArea = tableData[countryIso][tableName][column].forestArea.raw
  const totalLandArea = tableData[countryIso][tableName][column].totalLandArea.raw
  const forestAreaAsPercentage = 100 * (forestArea / totalLandArea)

  const data = {
    datasets: [
      {
        data: [forestAreaAsPercentage, 100 - forestAreaAsPercentage],
        borderWidth: 0,
        backgroundColor: [ChartColors.green, ChartColors.gray],
        hoverBackgroundColor: [ChartColors.greenHover, ChartColors.grayHover],
        unit: '%',
      },
    ],
    labels: [i18n.t('statisticalFactsheets.rowName.forestArea'), i18n.t('statisticalFactsheets.rowName.otherArea')],
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
      <Chart type="pie" data={data} options={options} />
    </div>
  )
}

export default ForestAreaPercent
