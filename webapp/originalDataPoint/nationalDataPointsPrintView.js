import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as R from 'ramda'

import DataSources from './components/dataSources'
import NationalClasses from './components/nationalClasses'
import ExtentOfForestSection from './components/originalData/extentOfForestSection'
import ForestCharacteristicsSection from './components/originalData/forestCharacteristicsSection'

import { fetchOdps } from './actions'
import { isPrintingOnlyTables } from '../printAssessment/printAssessment'

const DataSourcesPrintView = ({ ndps, ...props }) => (
  <div className="odp__section-print-mode">
    <h3 className="subhead">
      {props.i18n.t('nationalDataPoint.dataSources')}
    </h3>
    {
      ndps.map((ndp, i) =>
        <DataSources
          key={i}
          {...props}
          odp={ndp}
          printView={true} />
      )
    }
  </div>
)

const NationalClassesPrintView = ({ ndps, ...props }) => (
  <div className="odp__section-print-mode">
    <h3 className="subhead">
      {props.i18n.t('nationalDataPoint.nationalClasses')}
    </h3>
    {
      ndps.map((ndp, i) =>
        <NationalClasses
          key={i}
          {...props}
          odp={ndp}
          printView={true} />
      )
    }
  </div>
)

const OriginalDataPrintView = ({ ndps, section, ...props }) => (
  <div className="odp__section-print-mode">
    <h3 className="subhead">
      {props.i18n.t('nationalDataPoint.reclassificationLabel')}
    </h3>
    {
      ndps.map((ndp, i) => {
        const component = section === 'extentOfForest' ? ExtentOfForestSection : ForestCharacteristicsSection
        return React.createElement(component, { key: i, ...props, odp: ndp, printView: true })
      })
    }
  </div>
)

const NationalDataPointsPrintView = props => {
  if (isPrintingOnlyTables()) {
    return null
  }

  const { ndps, i18n, fetchOdps } = props
  const { countryIso } = useParams()

  useEffect(() => {
    fetchOdps(countryIso)
  }, [])

  const data = ndps && !R.isEmpty(ndps) &&
    ndps
      .filter(ndp => !(R.isNil(ndp.year) || R.isEmpty(ndp.year)))
      .sort((a, b) => Number(a.year) - Number(b.year))

  if (!data) {
    return <div>
      <i>{i18n.t('description.loading')}</i>
    </div>
  }

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.nationalData')}</h2>
      <DataSourcesPrintView {...this.props} ndps={data} />
      <NationalClassesPrintView {...this.props} ndps={data} />
      <OriginalDataPrintView {...this.props} ndps={data} />
    </div>
  )
}

const mapStateToProps = state => ({
  ndps: state.originalDataPoint.odps
})

export default connect(mapStateToProps, { fetchOdps })(NationalDataPointsPrintView)
