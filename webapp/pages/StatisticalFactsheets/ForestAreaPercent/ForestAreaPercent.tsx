import React from 'react'
import { useI18n } from '@webapp/components/hooks'
import Chart from '@webapp/components/Chart'
import { colors } from '@webapp/components/Chart/utils/colors'
import { ChartType, getOptions } from '@webapp/components/Chart/utils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'

type Props = {
  levelIso: string
}
const ForestAreaPercent = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestAreaPercent'
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  if (!loaded) {
    return null
  }
  const forestArea = data[0] && data[0]['2020']
  const landArea = data[1] && data[1]['2015']
  const forestAreaAsPercentage = 100 * (forestArea / landArea)
  const chartData = {
    datasets: [
      {
        data: [forestAreaAsPercentage, 100 - forestAreaAsPercentage],
        borderWidth: 0,
        backgroundColor: [colors.green, colors.gray],
        hoverBackgroundColor: [colors.greenHover, colors.grayHover],
        unit: '%',
      },
    ],
    labels: [i18n.t('statisticalFactsheets.rowName.forest_area'), i18n.t('statisticalFactsheets.rowName.other_area')],
  }
  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Chart type="pie" data={chartData} options={getOptions({ type: ChartType.pie })} />
    </div>
  )
}
export default ForestAreaPercent
