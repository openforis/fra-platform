import React from 'react'
import { Areas } from '@core/country'
import { useI18n } from '@webapp/components/hooks'
import * as ChartUtils from '@webapp/components/Chart/chartUtils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import Chart from '../../../components/Chart'

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
          data={ChartUtils.getData(data, chartHeads, loaded, i18n, unit, isIsoCountry)}
          options={ChartUtils.getOptions({
            type: ChartUtils.types.bar,
            xAxisLabel: i18n.t('common.year'),
            yAxisLabel: unit,
          })}
        />
      )}
    </div>
  )
}
export default ForestArea
