import React from 'react'
import PropTypes from 'prop-types'
import Chart from '@webapp/app/countryLanding/views/statisticalFactsheets/components/chart/Chart'
import * as ChartUtils from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/chartUtils'
import { useI18n } from '@webapp/components/hooks'
import useStatisticalFactsheetsState from '@webapp/app/countryLanding/views/statisticalFactsheets/hooks/useStatisticalFactsheetsState'
import { getVariableValuesByYear } from '../utils/propUtils'

import * as APIUtils from '../utils/apiUtils'

const ForestOwnership = (props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestOwnership'
  const unit = i18n.t('unit.haThousand')

  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)

  if (!loaded) {
    return null
  }

  // Get the value for year
  const year = '2015'
  const { rowNames: variables } = APIUtils.getParams('forestOwnership')
  const [privateOwnership, publicOwnership, otherOrUnknown] = getVariableValuesByYear({ data, variables, year })

  const chartData = {
    datasets: [
      {
        data: [publicOwnership, privateOwnership, otherOrUnknown],
        backgroundColor: [ChartUtils.colors.purple, ChartUtils.colors.orange, ChartUtils.colors.gray],
        borderWidth: 0,
        hoverBackgroundColor: [
          ChartUtils.colors.purpleHover,
          ChartUtils.colors.orangeHover,
          ChartUtils.colors.grayHover,
        ],
        unit,
      },
    ],

    labels: [
      i18n.t('statisticalFactsheets.forestOwnership.public'),
      i18n.t('statisticalFactsheets.forestOwnership.private'),
      i18n.t('statisticalFactsheets.rowName.other_or_unknown'),
    ],
  }

  return (
    <div className="row-s">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Chart type="pie" data={chartData} options={ChartUtils.getOptions({ type: ChartUtils.types.pie })} />
    </div>
  )
}
ForestOwnership.propTypes = {
  levelIso: PropTypes.string.isRequired,
}
export default ForestOwnership
