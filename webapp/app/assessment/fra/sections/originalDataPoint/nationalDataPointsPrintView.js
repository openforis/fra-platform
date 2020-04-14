import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import useI18n from '@webapp/components/hooks/useI18n'

import DataSources from './originalDataPointView/components/dataSources'
import NationalClasses from './originalDataPointView/components/nationalClasses'
import ExtentOfForest from './originalDataPointView/components/originalData/extentOfForest'
import ForestCharacteristics from './originalDataPointView/components/originalData/forestCharacteristics'

const NationalDataPointsPrintView = (props) => {
  const { section } = props

  const i18n = useI18n()
  const data = useSelector((state) =>
    state.originalDataPoint.odps
      .filter((ndp) => !(R.isNil(ndp.year) || R.isEmpty(ndp.year)))
      .sort((a, b) => Number(a.year) - Number(b.year))
  )

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.nationalData')}</h2>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.dataSources')}</h3>
        {data.map((odp) => (
          <DataSources key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.nationalClasses')}</h3>
        {data.map((odp) => (
          <NationalClasses key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.reclassificationLabel')}</h3>
        {data.map((odp) => {
          const component = section === 'extentOfForest' ? ExtentOfForest : ForestCharacteristics
          return React.createElement(component, { key: odp.odpId, ...props, odp })
        })}
      </div>
    </div>
  )
}

NationalDataPointsPrintView.propTypes = {
  section: PropTypes.string.isRequired,
}

export default NationalDataPointsPrintView
