import React from 'react'
import { Areas } from '@core/country'
import Chart, { ChartType, getChartOptions, ChartColors } from '@webapp/components/Chart'
import { useI18n } from '@webapp/components/hooks'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import { formatValue } from '../utils/numberUtils'
import { getVariableValuesByYear } from '../utils/propUtils'
import * as APIUtils from '../utils/apiUtils'

type Props = {
  levelIso: string
}
const ForestOwnership = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestOwnership'
  const isIsoCountry = Areas.isISOCountry(levelIso)
  const unit = isIsoCountry ? i18n.t('unit.haThousand') : i18n.t('unit.haMillion')
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  if (!loaded) {
    return null
  }
  // Get the value for year
  const year = '2015'
  // @ts-ignore
  // TODO: fix
  const { rowNames: variables } = APIUtils.getParams('forestOwnership')
  const [privateOwnership, publicOwnership, otherOrUnknown] = getVariableValuesByYear({ data, variables, year })
  const chartData = {
    datasets: [
      {
        data: [
          formatValue(publicOwnership, isIsoCountry),
          formatValue(privateOwnership, isIsoCountry),
          formatValue(otherOrUnknown, isIsoCountry),
        ],
        backgroundColor: [ChartColors.purple, ChartColors.orange, ChartColors.gray],
        borderWidth: 0,
        hoverBackgroundColor: [ChartColors.purpleHover, ChartColors.orangeHover, ChartColors.grayHover],
        unit,
      },
    ],
    labels: [
      i18n.t('statisticalFactsheets.forestOwnership.public'),
      i18n.t('statisticalFactsheets.forestOwnership.private'),
      i18n.t('statisticalFactsheets.rowName.other_or_unknown'),
    ],
  }
  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {privateOwnership && publicOwnership && otherOrUnknown ? (
        <Chart type="pie" data={chartData} options={getChartOptions({ type: ChartType.pie })} />
      ) : (
        <h6 className="header">{i18n.t('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default ForestOwnership
