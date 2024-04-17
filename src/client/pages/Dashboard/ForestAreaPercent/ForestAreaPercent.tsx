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
import { ChartColors, commonOptions } from '../utils/preferences'

const ForestAreaPercent = () => {
  const assessment = useAssessment()
  const cycle = useCycle()
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
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    countryIso,
    tableName,
    colName: column,
    data: tableData,
  }

  const forestArea = Number(RecordAssessmentDatas.getDatum({ ...props, variableName: 'forestArea' }))
  const totalLandArea = Number(
    RecordAssessmentDatas.getDatum({
      ...props,
      colName: isIsoCountry ? props.colName : '2015',
      variableName: 'totalLandArea',
    })
  )
  const forestAreaAsPercentage = Numbers.mul(100, Numbers.div(forestArea, totalLandArea))?.toNumber()

  const data = {
    datasets: [
      {
        data: [forestAreaAsPercentage, Numbers.sub(100, forestAreaAsPercentage)?.toNumber()],
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
      <Chart data={data} options={options} type="pie" />
    </div>
  )
}

export default ForestAreaPercent
