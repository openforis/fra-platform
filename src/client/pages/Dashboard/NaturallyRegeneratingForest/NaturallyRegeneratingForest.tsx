import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions } from 'chart.js'
import { Numbers } from 'utils/numbers'

import { Areas } from 'meta/area'
import { TableNames } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import Chart from 'client/components/ChartDeprecated'

import useDashboardData from '../hooks/useDashboardData'
import { commonOptions, preferences, scaleLabel } from '../utils/preferences'

const NaturallyRegeneratingForest = () => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const { t } = useTranslation()
  const section = 'naturallyRegeneratingForest'
  const columns = ['1990', '2000', '2010', '2020']
  const unit = isIsoCountry ? t('unit.haThousand') : t('unit.haMillion')
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
      label: t(`statisticalFactsheets.rowName.${variable}`),
      unit,

      data: columns.map((column) => {
        const raw = RecordAssessmentDatas.getDatum({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          data: tableData,
          colName: column,
          variableName: variable,
          countryIso,
          tableName,
        })
        if (isIsoCountry) return raw
        return Numbers.div(raw, 1000)?.toNumber()
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
        title: scaleLabel(t('common.year')),
      },

      y: {
        ticks: {
          maxTicksLimit: 6,
          beginAtZero: true,
        },
        title: scaleLabel(unit),
      },
    },
  } as unknown as ChartOptions<'bar'>

  return (
    <div className="row-l">
      <h3 className="header">{t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && <Chart data={data} options={options} type="bar" />}
    </div>
  )
}
export default NaturallyRegeneratingForest
