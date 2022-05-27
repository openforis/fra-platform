import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@core/country'
import { ChartOptions } from 'chart.js'

import { useCountryIso } from '@client/hooks'
import Chart from '@client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { commonOptions, preferences, scaleLabel } from '../utils/preferences'

const NaturallyRegeneratingForest = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()
  const section = 'naturallyRegeneratingForest'
  const columns = ['1990', '2000', '2010', '2020']
  const isIsoCountry = Areas.isISOCountry(countryIso)
  const unit = isIsoCountry ? i18n.t('unit.haThousand') : i18n.t('unit.haMillion')
  const tableName = 'forestCharacteristics'
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
      label: i18n.t(`statisticalFactsheets.rowName.${variable}`),
      unit,

      data: columns.map((column) => tableData?.[countryIso][tableName][column][variable].raw),
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
  options.scales.xAxes[0].scaleLabel = scaleLabel(i18n.t('common.year'))
  // @ts-ignore
  options.scales.yAxes[0].scaleLabel = scaleLabel(unit)

  return (
    <div className="row-l">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && <Chart type="bar" data={data} options={options} />}
    </div>
  )
}
export default NaturallyRegeneratingForest
