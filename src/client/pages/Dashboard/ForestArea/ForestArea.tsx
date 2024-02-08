import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions } from 'chart.js'

import { Areas } from 'meta/area'
import { TableNames } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import Chart from 'client/components/Chart'

import useDashboardData from '../hooks/useDashboardData'
import { commonOptions, preferences, scaleLabel } from '../utils/preferences'

const ForestArea = () => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const section = 'forestArea'
  const columns = ['1990', '2000', '2010', '2020']
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)
  const unit = isIsoCountry ? t('unit.haThousand') : t('unit.haMillion')
  const tableNames = [isIsoCountry ? TableNames.extentOfForest : TableNames.valueAggregate]
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
        label: t(`statisticalFactsheets.rowName.${variable}`),
        unit,

        data: tableNames
          .map((tableName) =>
            RecordAssessmentDatas.getTableData({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              tableName,
              data: tableData,
              countryIso,
            })
          )
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
      x: {
        stacked: true,
        scaleLabel: scaleLabel(t('common.year')),
      },
      y: {
        scaleLabel: scaleLabel(unit),
        stacked: true,
        ticks: {
          maxTicksLimit: 6,
          beginAtZero: true,
        },
        title: {
          color: '#7f7f7f',
          display: true,
          text: unit,
        },
      },
    },
  } as unknown as ChartOptions<'bar'>

  return (
    <div className="row-m">
      <h3 className="header">{t(`statisticalFactsheets.${section}.title`)}</h3>
      {data && <Chart type="bar" options={options} data={data} />}
    </div>
  )
}

export default ForestArea
