import React from 'react'
import { Area } from '@common/country'
import Chart from '@webapp/app/countryLanding/views/statisticalFactsheets/components/chart/Chart'
import * as ChartUtils from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/chartUtils'
import { useI18n } from '@webapp/components/hooks'
import useStatisticalFactsheetsState from '@webapp/app/countryLanding/views/statisticalFactsheets/hooks/useStatisticalFactsheetsState'
import { formatValue } from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/numberUtils'
import { getVariableValuesByYear } from '../utils/propUtils'
import * as APIUtils from '../utils/apiUtils'

type Props = {
  levelIso: string
}
const ForestOwnership = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'forestOwnership'
  const isIsoCountry = Area.isISOCountry(levelIso)
  const unit = isIsoCountry ? i18n.t('unit.haThousand') : i18n.t('unit.haMillion')
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  if (!loaded) {
    return null
  }
  // Get the value for year
  const year = '2015'
  // @ts-ignore
  // TODO: fix
  const { rowNames: variables } = APIUtils.getParams('forestOwnership')
  const [privateOwnership, publicOwnership, otherOrUnknown] = getVariableValuesByYear({ data, variables, year })
  const chartData = {
    datasets: [
      {
        data: [
          formatValue(publicOwnership, isIsoCountry),
          formatValue(privateOwnership, isIsoCountry),
          formatValue(otherOrUnknown, isIsoCountry),
        ],
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
      {privateOwnership && publicOwnership && otherOrUnknown ? (
        <Chart type="pie" data={chartData} options={ChartUtils.getOptions({ type: ChartUtils.types.pie })} />
      ) : (
        <h6 className="header">{i18n.t('statisticalFactsheets.noData')}</h6>
      )}
    </div>
  )
}
export default ForestOwnership
