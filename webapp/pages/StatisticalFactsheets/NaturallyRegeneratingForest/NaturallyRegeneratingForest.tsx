import React from 'react'
import { Area } from '@common/country'
import { useI18n } from '@webapp/components/hooks'
import * as ChartUtils from '../utils/chartUtils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import Chart from '../components/chart'

type Props = {
  levelIso: string
}
const NaturallyRegeneratingForest = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'naturallyRegeneratingForest'
  const chartHeads = ['1990', '2000', '2010', '2020']
  const isIsoCountry = Area.isISOCountry(levelIso)
  const unit = isIsoCountry ? i18n.t('unit.haThousand') : i18n.t('unit.haMillion')
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  const chartData = ChartUtils.getData(data, chartHeads, section, loaded, i18n, unit, isIsoCountry)
  return (
    <div className="row-l">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && (
        <Chart
          type="bar"
          data={chartData}
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
export default NaturallyRegeneratingForest
