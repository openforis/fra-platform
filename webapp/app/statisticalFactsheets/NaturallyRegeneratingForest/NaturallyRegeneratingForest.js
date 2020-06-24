import './naturallyRegeneratingForest.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { useI18n } from '@webapp/components/hooks'
import * as ChartUtils from '../utils/chartUtils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'

const NaturallyRegeneratingForest = (props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'naturallyRegeneratingForest'
  const chartHeads = ['1990', '2000', '2010', '2020']

  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)

  return (
    <div className="statistical-factsheets-naturally-regenerating-forest">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      {loaded && (
        <Bar
          data={ChartUtils.getData(data, chartHeads, section, loaded, i18n)}
          options={ChartUtils.getOptions('stackedBar')}
        />
      )}
    </div>
  )
}

NaturallyRegeneratingForest.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default NaturallyRegeneratingForest
