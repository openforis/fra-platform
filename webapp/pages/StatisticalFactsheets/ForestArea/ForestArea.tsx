import React from 'react'
import { Areas } from '@core/country'
import { useI18n } from '@webapp/components/hooks'
import Chart, { ChartType, getChartData, getChartOptions } from '@webapp/components/Chart'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'

type Props = {
  levelIso: string
}
const ForestArea = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestArea'
  const chartHeads = ['1990', '2000', '2010', '2020']
  const isIsoCountry = Areas.isISOCountry(levelIso)
  const unit = isIsoCountry ? i18n.t('unit.haThousand') : i18n.t('unit.haMillion')
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  return (
    <div className="row-m">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && (
        <Chart
          type="bar"
          data={getChartData(data, chartHeads, loaded, i18n, unit, isIsoCountry)}
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
export default ForestArea
