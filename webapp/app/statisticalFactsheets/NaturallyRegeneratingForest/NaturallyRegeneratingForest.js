import './naturallyRegeneratingForest.less'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { useGetRequest, useI18n } from '@webapp/components/hooks'
import * as APIUtils from '../utils/apiUtils'
import * as ChartUtils from '../utils/chartUtils'
import { getParams } from '../utils/apiUtils'

const NaturallyRegeneratingForest = (props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const section = 'naturallyRegeneratingForest'
  const chartHeads = ['1990', '2000', '2010', '2020']

  const url = APIUtils.getUrl(levelIso)
  const params = getParams(section)

  const { data, dispatch: fetchData, loaded } = useGetRequest(url, {
    params,
  })

  useEffect(fetchData, [url])
  return (
    <div className="statistical-factsheets-naturally-regenerating-forest">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>
      <Bar
        data={ChartUtils.getData(data, chartHeads, section, loaded, i18n)}
        options={ChartUtils.getOptions('stackedBar', loaded)}
      />
    </div>
  )
}

NaturallyRegeneratingForest.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default NaturallyRegeneratingForest
