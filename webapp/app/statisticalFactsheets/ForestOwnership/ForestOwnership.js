import './forestOwnership.less'
import React from 'react'
import PropTypes from 'prop-types'
import Chart from '@webapp/app/statisticalFactsheets/components/chart/Chart'
import * as ChartUtils from '@webapp/app/statisticalFactsheets/utils/chartUtils'
import { useI18n } from '@webapp/components/hooks'
import useStatisticalFactsheetsState from '@webapp/app/statisticalFactsheets/hooks/useStatisticalFactsheetsState'
import { getPropsForYearAsNumbers } from '../utils/propUtils'

const ForestOwnership = (props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestOwnership'

  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)

  if (!loaded) {
    return null
  }

  // Get the value for year
  const year = '2015'
  const propNames = ['private_ownership', 'public_ownership', 'other_or_unknown']

  const [privateOwnership, publicOwnership, otherOrUnknown] = getPropsForYearAsNumbers(data, year, propNames)

  const chartData = {
    datasets: [
      {
        data: [publicOwnership, privateOwnership, otherOrUnknown],
        backgroundColor: [ChartUtils.colors.purple, ChartUtils.colors.orange, ChartUtils.colors.green],
        borderWidth: 0,
        hoverBackgroundColor: [
          ChartUtils.colors.purpleHover,
          ChartUtils.colors.orangeHover,
          ChartUtils.colors.greenHover,
        ],
      },
    ],

    labels: [
      i18n.t('statisticalFactsheets.rowName.public_ownership'),
      i18n.t('statisticalFactsheets.rowName.private_ownership'),
      i18n.t('statisticalFactsheets.rowName.other_or_unknown'),
    ],
  }

  return (
    <div className="statistical-factsheets-forest-ownership">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Chart type="pie" data={chartData} options={ChartUtils.getOptions('pie')} />
    </div>
  )
}
ForestOwnership.propTypes = {
  levelIso: PropTypes.string.isRequired,
}
export default ForestOwnership
