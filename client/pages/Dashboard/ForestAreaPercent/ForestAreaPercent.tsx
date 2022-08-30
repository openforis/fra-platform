import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'
import { ChartOptions } from 'chart.js'

import { Areas } from '@meta/area'
import { TableNames } from '@meta/assessment'
import { TableDatas } from '@meta/data'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { ChartColors, commonOptions } from '../utils/preferences'

const ForestAreaPercent = () => {
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const section = 'forestAreaPercent'
  const column = '2020'
  const tableName = isIsoCountry ? TableNames.extentOfForest : TableNames.valueAggregate
  const variables = ['forestArea', 'totalLandArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableName],
    variables,
  })

  if (!loaded) {
    return null
  }

  const props = {
    countryIso,
    tableName,
    colName: column,
    data: tableData,
  }

  const forestArea = Number(TableDatas.getDatum({ ...props, variableName: 'forestArea' }))
  const totalLandArea = Number(
    TableDatas.getDatum({ ...props, colName: isIsoCountry ? props.colName : '2015', variableName: 'totalLandArea' })
  )
  const forestAreaAsPercentage = Numbers.mul(100, Numbers.div(forestArea, totalLandArea)).toNumber()

  const data = {
    datasets: [
      {
        data: [forestAreaAsPercentage, Numbers.sub(100, forestAreaAsPercentage).toNumber()],
        borderWidth: 0,
        backgroundColor: [ChartColors.green, ChartColors.gray],
        hoverBackgroundColor: [ChartColors.greenHover, ChartColors.grayHover],
        unit: '%',
      },
    ],
    labels: [
      i18n.t<string>('statisticalFactsheets.rowName.forestArea'),
      i18n.t<string>('statisticalFactsheets.rowName.otherArea'),
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
      <Chart type="pie" data={data} options={options} />
    </div>
  )
}

export default ForestAreaPercent
