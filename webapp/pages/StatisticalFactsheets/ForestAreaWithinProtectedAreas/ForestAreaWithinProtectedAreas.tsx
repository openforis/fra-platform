import React from 'react'
import { useI18n } from '@webapp/components/hooks'
import Chart, { ChartType, getChartOptions, ChartColors } from '@webapp/components/Chart'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import * as APIUtils from '../utils/apiUtils'
import { getVariableValuesByYear } from '../utils/propUtils'

type Props = {
  levelIso: string
}
const ForestAreaWithinProtectedAreas = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestAreaWithinProtectedAreas'
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  if (!loaded) {
    return null
  }
  // Get the value for year 2020
  const year = '2020'
  // @ts-ignore
  // TODO: fix
  const { rowNames: variables } = APIUtils.getParams('forestAreaWithinProtectedAreas')
  const [forestArea, forestAreaWithinProtectedAreas] = getVariableValuesByYear({ data, variables, year })
  const forestAreaWithinProtectedAreasAsPercentage = 100 * (forestAreaWithinProtectedAreas / forestArea)
  const chartData = {
    datasets: [
      {
        data: [100 - forestAreaWithinProtectedAreasAsPercentage, forestAreaWithinProtectedAreasAsPercentage],
        borderWidth: 0,
        backgroundColor: [ChartColors.green, ChartColors.lightGreen],
        hoverBackgroundColor: [ChartColors.greenHover, ChartColors.lightGreenHover],
        unit: '%',
      },
    ],
    labels: [
      i18n.t('statisticalFactsheets.rowName.forest_area'),
      i18n.t('statisticalFactsheets.rowName.forest_area_within_protected_areas'),
    ],
  }

  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {forestAreaWithinProtectedAreas && forestArea ? (
        <Chart type="pie" data={chartData} options={getChartOptions({ type: ChartType.pie })} />
      ) : (
        <h6 className="header">{i18n.t('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default ForestAreaWithinProtectedAreas
