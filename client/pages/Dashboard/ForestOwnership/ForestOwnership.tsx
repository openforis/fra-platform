import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@core/country'
import { ChartOptions } from 'chart.js'

import { TableNames } from '@meta/assessment'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'
import { ChartDataType } from '@client/components/Chart/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { formatValue } from '../utils/numberUtils'
import { ChartColors, commonOptions } from '../utils/preferences'

const ForestOwnership = () => {
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const section = 'forestOwnership'
  const unit = isIsoCountry ? i18n.t<string>('unit.haThousand') : i18n.t<string>('unit.haMillion')
  const column = '2015'
  const tableName = isIsoCountry ? TableNames.forestOwnership : TableNames.valueAggregate
  const variables = ['other_or_unknown', 'private_ownership', 'public_ownership']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableName],
    variables,
  })

  if (!loaded) {
    return null
  }
  const privateOwnership = tableData[countryIso][tableName][column].private_ownership.raw
  const publicOwnership = tableData[countryIso][tableName][column].public_ownership.raw
  const otherOrUnknown = tableData[countryIso][tableName][column].other_or_unknown.raw

  const data = {
    datasets: [
      {
        data: [
          formatValue(publicOwnership, isIsoCountry),
          formatValue(privateOwnership, isIsoCountry),
          formatValue(otherOrUnknown, isIsoCountry),
        ],
        backgroundColor: [ChartColors.purple, ChartColors.orange, ChartColors.gray],
        borderWidth: 0,
        hoverBackgroundColor: [ChartColors.purpleHover, ChartColors.orangeHover, ChartColors.grayHover],
        unit,
      },
    ],
    labels: [
      i18n.t<string>('statisticalFactsheets.forestOwnership.public'),
      i18n.t<string>('statisticalFactsheets.forestOwnership.private'),
      i18n.t<string>('statisticalFactsheets.rowName.otherOrUnknown'),
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
      {privateOwnership && publicOwnership && otherOrUnknown ? (
        <Chart type="pie" data={data as ChartDataType} options={options} />
      ) : (
        <h6 className="header">{i18n.t<string>('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default ForestOwnership
