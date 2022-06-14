import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@core/country'
import { ChartOptions } from 'chart.js'

import { TableNames } from '@meta/assessment'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { commonOptions, preferences, scaleLabel } from '../utils/preferences'

const NaturallyRegeneratingForest = () => {
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const section = 'naturallyRegeneratingForest'
  const columns = ['1990', '2000', '2010', '2020']
  const unit = isIsoCountry ? i18n.t<string>('unit.haThousand') : i18n.t<string>('unit.haMillion')
  const tableName = isIsoCountry ? TableNames.forestCharacteristics : TableNames.valueAggregate
  const variables = ['naturalForestArea', 'plantedForest']

  const { data: tableData, loaded } = useDashboardData({
    columns,
    tableNames: [tableName],
    variables,
  })

  const colors = ['green', 'orange']

  const data = loaded && {
    labels: columns,
    datasets: variables.map((variable, i) => ({
      // @ts-ignore
      ...preferences[colors[i]],
      label: i18n.t<string>(`statisticalFactsheets.rowName.${variable}`),
      unit,

      data: columns.map((column) => {
        const raw = tableData?.[countryIso][tableName][column][variable].raw
        if (isIsoCountry) return raw
        return raw / 1000
      }),
    })),
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
          scaleLabel: {},
        },
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: {},
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
    <div className="row-l">
      <h3 className="header">{i18n.t<string>(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && <Chart type="bar" data={data} options={options} />}
    </div>
  )
}
export default NaturallyRegeneratingForest
