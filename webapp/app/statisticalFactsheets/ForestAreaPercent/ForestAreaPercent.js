import './forestAreaPercent.less'
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

  // Get the value for year 2020
  const forestArea = Number(data[0]['2020'])
  const landArea = 100 - forestArea

  const chartData = {
    datasets: [
      {
        data: [forestArea, landArea],
        borderWidth: 0,
        backgroundColor: [ChartUtils.colors.green, ChartUtils.colors.gray],
        hoverBackgroundColor: [ChartUtils.colors.greenHover, ChartUtils.colors.grayHover],
      },
    ],

    labels: [i18n.t('statisticalFactsheets.rowName.forest_area'), i18n.t('statisticalFactsheets.rowName.land_area')],
  }

  return (
    <div className="statistical-factsheets-forest-area-percent">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && <Chart type="pie" data={chartData} options={ChartUtils.getOptions('pie')} />}
    </div>
  )
}

ForestAreaPercent.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default ForestAreaPercent
