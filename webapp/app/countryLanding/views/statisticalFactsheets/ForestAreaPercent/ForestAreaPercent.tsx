import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import * as ChartUtils from '../utils/chartUtils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import Chart from '../components/chart'

const ForestAreaPercent = (props) => {
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
        backgroundColor: [ChartUtils.colors.green, ChartUtils.colors.gray],
        hoverBackgroundColor: [ChartUtils.colors.greenHover, ChartUtils.colors.grayHover],
        unit: '%',
      },
    ],

    labels: [i18n.t('statisticalFactsheets.rowName.forest_area'), i18n.t('statisticalFactsheets.rowName.other_area')],
  }

  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Chart type="pie" data={chartData} options={ChartUtils.getOptions({ type: ChartUtils.types.pie })} />
    </div>
  )
}

ForestAreaPercent.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default ForestAreaPercent
