import React from 'react'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
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
  const unit = isIsoCountry ? (i18n as any).t('unit.haThousand') : (i18n as any).t('unit.haMillion')
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  const chartData = ChartUtils.getData(data, chartHeads, section, loaded, i18n, unit, isIsoCountry)
  return (
    <div className="row-l">
      <h3 className="header">{(i18n as any).t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && (
        <Chart
          type="bar"
          data={chartData}
          options={ChartUtils.getOptions({
            type: ChartUtils.types.bar,
            xAxisLabel: (i18n as any).t('common.year'),
            yAxisLabel: unit,
          })}
        />
      )}
    </div>
  )
}
export default NaturallyRegeneratingForest
