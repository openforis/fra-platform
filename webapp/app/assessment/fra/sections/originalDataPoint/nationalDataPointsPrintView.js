import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import useI18n from '@webapp/components/hooks/useI18n'

import DataSources from './components/dataSources'
import NationalClasses from './components/nationalClasses'
import ExtentOfForestSection from './components/originalData/extentOfForestSection'
import ForestCharacteristicsSection from './components/originalData/forestCharacteristicsSection'

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
          <DataSources key={odp.odpId} odp={odp} i18n={i18n} printView />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.nationalClasses')}</h3>
        {data.map((odp) => (
          <NationalClasses key={odp.odpId} i18n={i18n} odp={odp} printView />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.reclassificationLabel')}</h3>
        {data.map((odp) => {
          const component = section === 'extentOfForest' ? ExtentOfForestSection : ForestCharacteristicsSection
          return React.createElement(component, { key: odp.odpId, ...props, odp, printView: true })
        })}
      </div>
    </div>
  )
}

NationalDataPointsPrintView.propTypes = {
  section: PropTypes.string.isRequired,
}

export default NationalDataPointsPrintView
