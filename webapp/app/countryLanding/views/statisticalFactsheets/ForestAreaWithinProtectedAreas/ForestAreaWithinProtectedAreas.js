import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import * as ChartUtils from '../utils/chartUtils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import Chart from '../components/chart'

const ForestAreaWithinProtectedAreas = (props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestAreaWithinProtectedAreas'
  const chartHeads = ['1990', '2000', '2010', '2020']
  const unit = i18n.t('unit.haMillion')

  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)

  return (
    <div className="row-m">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && (
        <Chart
          type="bar"
          data={ChartUtils.getData(data, chartHeads, section, loaded, i18n, unit)}
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

ForestAreaWithinProtectedAreas.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default ForestAreaWithinProtectedAreas
