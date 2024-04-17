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

const ForestAreaWithinProtectedAreas = () => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const section = 'forestAreaWithinProtectedAreas'
  const column = '2020'
  const tableNamePrimary = isIsoCountry ? TableNames.forestAreaWithinProtectedAreas : TableNames.valueAggregate
  const tableNameSecondary = isIsoCountry ? TableNames.extentOfForest : TableNames.valueAggregate
  const variables = ['forest_area_within_protected_areas', 'forestArea']

  const { data: tableData, loaded } = useDashboardData({
    columns: [column],
    tableNames: [tableNamePrimary, tableNameSecondary],
    variables,
  })

  if (!loaded) {
    return null
  }

  const props = {
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    colName: column,
    countryIso,
    data: tableData,
  }

  const forestArea = Number(
    RecordAssessmentDatas.getDatum({ ...props, tableName: tableNameSecondary, variableName: 'forestArea' })
  )
  const forestAreaWithinProtectedAreas = Number(
    RecordAssessmentDatas.getDatum({
      ...props,
      tableName: tableNamePrimary,
      variableName: 'forest_area_within_protected_areas',
    })
  )

  const primaryForestAsPercentage = Numbers.mul(
    100,
    Numbers.div(forestAreaWithinProtectedAreas, forestArea)
  )?.toNumber()

  const data = {
    datasets: [
      {
        data: [Numbers.sub(100, primaryForestAsPercentage)?.toNumber(), primaryForestAsPercentage],
        borderWidth: 0,
        backgroundColor: [ChartColors.green, ChartColors.lightGreen],
        hoverBackgroundColor: [ChartColors.greenHover, ChartColors.lightGreenHover],
        unit: '%',
      },
    ],
    labels: [
      i18n.t<string>('statisticalFactsheets.rowName.forestArea'),
      i18n.t<string>('statisticalFactsheets.rowName.forestAreaWithinProtectedAreas'),
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
      {forestAreaWithinProtectedAreas && forestArea ? (
        <Chart data={data} options={options} type="pie" />
      ) : (
        <h6 className="header">{i18n.t<string>('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default ForestAreaWithinProtectedAreas
