import React from 'react'
import { useI18n } from '@webapp/components/hooks'
import Chart from '../components/chart'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import * as APIUtils from '../utils/apiUtils'
import * as ChartUtils from '../utils/chartUtils'
import { getVariableValuesByYear } from '../utils/propUtils'

type Props = {
  levelIso: string
}
const PrimaryForest = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'primaryForest'
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  if (!loaded) {
    return null
  }
  // Get the value for year 2020
  const year = '2020'
  // TODO: Fix missing level
  // @ts-ignore
  const { rowNames: variables } = APIUtils.getParams('primaryForest')
  const [primaryForestRatio] = getVariableValuesByYear({ data, variables, year })
  const primaryForestPercent = primaryForestRatio * 100
  const otherForestPercent = 100 - primaryForestPercent
  const chartData = {
    datasets: [
      {
        data: [primaryForestPercent, otherForestPercent],
        borderWidth: 0,
        backgroundColor: [ChartUtils.colors.green, ChartUtils.colors.lightGreen],
        hoverBackgroundColor: [ChartUtils.colors.greenHover, ChartUtils.colors.lightGreenHover],
        unit: '%',
      },
    ],
    labels: [
      i18n.t('statisticalFactsheets.rowName.primary_forest'),
      i18n.t('statisticalFactsheets.rowName.other_forest'),
    ],
  }
  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {primaryForestRatio ? (
        <Chart type="pie" data={chartData} options={ChartUtils.getOptions({ type: ChartUtils.types.pie })} />
      ) : (
        <h6 className="header">{i18n.t('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default PrimaryForest
