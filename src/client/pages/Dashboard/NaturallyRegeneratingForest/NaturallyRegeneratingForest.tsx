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
        const raw = TableDatas.getDatum({
          data: tableData,
          colName: column,
          variableName: variable,
          countryIso,
          tableName,
        })
        if (isIsoCountry) return raw
        return Numbers.div(raw, 1000).toNumber()
      }),
    })),
  }

  const options = {
    ...commonOptions,
    legend: {
      display: false,
    },
    scales: {
      x: {
        scaleLabel: scaleLabel(i18n.t<string>('common.year')),
      },

      y: {
        scaleLabel: scaleLabel(unit),
        ticks: {
          maxTicksLimit: 6,
          beginAtZero: true,
        },
      },
    },
  } as unknown as ChartOptions<'bar'>

  return (
    <div className="row-l">
      <h3 className="header">{i18n.t<string>(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && <Chart type="bar" data={data} options={options} />}
    </div>
  )
}
export default NaturallyRegeneratingForest
