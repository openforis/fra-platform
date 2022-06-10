import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions } from 'chart.js'

import { Areas } from '@meta/area'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { commonOptions, preferences, scaleLabel } from '../utils/preferences'

const ForestArea = () => {
  const i18n = useTranslation()
  const section = 'forestArea'
  const columns = ['1990', '2000', '2010', '2020']
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)
  const unit = isIsoCountry ? i18n.t<string>('unit.haThousand') : i18n.t<string>('unit.haMillion')
  const tableNames = [isIsoCountry ? 'extentOfForest' : 'aggregate']
  const variable = 'forestArea'

  const { data: tableData, loaded } = useDashboardData({
    columns,
    tableNames,
    variables: [variable],
  })

  const data = loaded && {
    labels: columns,
    datasets: [
      {
        ...preferences.green,
        label: i18n.t<string>(`statisticalFactsheets.rowName.${variable}`),
        unit,

        data: tableNames
          .map((tableName) => tableData?.[countryIso][tableName])
          .flatMap(Object.values)
          .flatMap(Object.values)
          .map(({ raw }) => (!isIsoCountry ? raw / 1000 : raw)),
      },
    ],
  }

  const options = {
    ...commonOptions,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            maxTicksLimit: 6,
            beginAtZero: true,
            stepSize: 0.75,
          },
        },
      ],
    },
  } as unknown as ChartOptions<'bar'>

  // @ts-ignore
  options.scales.xAxes[0].scaleLabel = scaleLabel(i18n.t<string>('common.year'))
  // @ts-ignore
  options.scales.yAxes[0].scaleLabel = scaleLabel(unit)

  return (
    <div className="row-m">
      <h3 className="header">{i18n.t<string>(`statisticalFactsheets.${section}.title`)}</h3>
      {data && <Chart type="bar" options={options} data={data} />}
    </div>
  )
}

export default ForestArea
