import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'
import { Objects } from '@utils/objects'
import { ChartOptions } from 'chart.js'

import { Areas } from '@meta/area'
import { TableNames } from '@meta/assessment'
import { TableDatas } from '@meta/data'

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
  const tableNamePrimary = isIsoCountry ? TableNames.specificForestCategories : TableNames.valueAggregate
  const tableNameSecondary = isIsoCountry ? TableNames.extentOfForest : TableNames.valueAggregate
  const variables = ['primary_forest', 'forestArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableNamePrimary, tableNameSecondary],
    variables,
  })

  if (!loaded) {
    return null
  }

  const props = {
    countryIso,
    data: tableData,
    colName: column,
  }

  const otherForest = Number(
    TableDatas.getDatum({ ...props, tableName: tableNameSecondary, variableName: 'forestArea' })
  )
  const primaryForest = Number(
    TableDatas.getDatum({ ...props, tableName: tableNamePrimary, variableName: 'primary_forest' })
  )

  const primaryForestAsPercentage = Numbers.mul(100, Numbers.div(primaryForest, otherForest))?.toNumber()

  const data = {
    datasets: [
      {
        data: [primaryForestAsPercentage, Numbers.sub(100, primaryForestAsPercentage)?.toNumber()],
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
      {!Objects.isEmpty(primaryForestAsPercentage) ? (
        <Chart type="pie" data={data} options={options} />
      ) : (
        <h6 className="header">{i18n.t<string>('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default PrimaryForest
