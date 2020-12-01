import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '@webapp/components/hooks'

import Chart from '../components/chart'
import useStatisticalFactsheetsState from '../hooks/useStatisticalFactsheetsState'
import * as APIUtils from '../utils/apiUtils'
import * as ChartUtils from '../utils/chartUtils'
import { getVariableValuesByYear } from '../utils/propUtils'

const ForestAreaWithinProtectedAreas = (props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestAreaWithinProtectedAreas'

  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)

  if (!loaded) {
    return null
  }

  // Get the value for year 2020
  const year = '2020'
  const { rowNames: variables } = APIUtils.getParams('forestAreaWithinProtectedAreas')

  const [forestArea = 0, protectedArea = 0] = getVariableValuesByYear({ data, variables, year })

  const chartData = {
    datasets: [
      {
        data: [forestArea, protectedArea],
        borderWidth: 0,
        backgroundColor: [ChartUtils.colors.green, ChartUtils.colors.lightGreen],
        hoverBackgroundColor: [ChartUtils.colors.greenHover, ChartUtils.colors.lightGreenHover],
        unit: '1000 ha',
      },
    ],

    labels: [
      i18n.t('statisticalFactsheets.rowName.forest_area'),
      i18n.t('statisticalFactsheets.rowName.forest_area_within_protected_areas'),
    ],
  }

  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Chart type="pie" data={chartData} options={ChartUtils.getOptions({ type: ChartUtils.types.pie })} />
    </div>
  )
}

ForestAreaWithinProtectedAreas.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default ForestAreaWithinProtectedAreas
