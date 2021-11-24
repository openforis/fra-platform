import React from 'react'
import { Areas } from '@core/country'
import { useI18n } from '../../../hooks'
import Chart from '../../../components/Chart'
import { ChartType, getChartOptions, getChartData } from '../../../components/Chart/utils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'

type Props = {
  levelIso: string
}
const NaturallyRegeneratingForest = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'naturallyRegeneratingForest'
  const chartHeads = ['1990', '2000', '2010', '2020']
  const isIsoCountry = Areas.isISOCountry(levelIso)
  const unit = isIsoCountry ? i18n.t('unit.haThousand') : i18n.t('unit.haMillion')
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  const chartData = getChartData(data, chartHeads, loaded, i18n, unit, isIsoCountry)
  return (
    <div className="row-l">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && (
        <Chart
          type="bar"
          data={chartData}
          options={getChartOptions({
            type: ChartType.bar,
            xAxisLabel: i18n.t('common.year'),
            yAxisLabel: unit,
          })}
        />
      )}
    </div>
  )
}
export default NaturallyRegeneratingForest
