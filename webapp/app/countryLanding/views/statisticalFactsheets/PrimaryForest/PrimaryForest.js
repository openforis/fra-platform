import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import * as APIUtils from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/apiUtils'
import * as ChartUtils from '../utils/chartUtils'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import Chart from '../components/chart'
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

  const [forestArea, primaryForest] = getVariableValuesByYear({ data, variables, year })

  const chartData = {
    datasets: [
      {
        data: [forestArea, primaryForest],
        borderWidth: 0,
        backgroundColor: [ChartUtils.colors.green, ChartUtils.colors.lightGreen],
        hoverBackgroundColor: [ChartUtils.colors.greenHover, ChartUtils.colors.lightGreenHover],
      },
    ],

    labels: [
      i18n.t('statisticalFactsheets.rowName.forest_area'),
      i18n.t('statisticalFactsheets.rowName.primary_forest'),
    ],
  }

  return (
    <div className="statistical-factsheets-primary-forest">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Chart type="pie" data={chartData} options={ChartUtils.getOptions('pie')} />
    </div>
  )
}

PrimaryForest.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default PrimaryForest
