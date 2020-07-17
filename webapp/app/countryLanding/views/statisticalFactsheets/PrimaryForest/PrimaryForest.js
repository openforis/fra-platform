import React from 'react'
import PropTypes from 'prop-types'

import * as NumberUtils from '@common/bignumberUtils'
import { useI18n } from '@webapp/components/hooks'

import Chart from '../components/chart'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import * as APIUtils from '../utils/apiUtils'
import * as ChartUtils from '../utils/chartUtils'
import { getVariableValuesByYear } from '../utils/propUtils'

const PrimaryForest = (props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'primaryForest'

  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)

  if (!loaded) {
    return null
  }

  // Get the value for year 2020
  const year = '2020'
  const { rowNames: variables } = APIUtils.getParams('primaryForest')

  const [forestArea = 0, primaryForest = 0] = getVariableValuesByYear({ data, variables, year })
  const otherForest = NumberUtils.sub(forestArea, primaryForest) || 0

  const primaryForestPercent = NumberUtils.mul(NumberUtils.div(primaryForest, forestArea), 100)
  const otherForestPercent = NumberUtils.mul(NumberUtils.div(otherForest, forestArea), 100)

  const chartData = {
    datasets: [
      {
        data: [primaryForestPercent.toString(), otherForestPercent.toString()],
        borderWidth: 0,
        backgroundColor: [ChartUtils.colors.green, ChartUtils.colors.lightGreen],
        hoverBackgroundColor: [ChartUtils.colors.greenHover, ChartUtils.colors.lightGreenHover],
        unit: '%',
      },
    ],

    labels: [
      i18n.t('statisticalFactsheets.rowName.primary_forest'),
      i18n.t('statisticalFactsheets.rowName.other_forest'),
    ],
  }

  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Chart type="pie" data={chartData} options={ChartUtils.getOptions({ type: ChartUtils.types.pie })} />
    </div>
  )
}

PrimaryForest.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default PrimaryForest
