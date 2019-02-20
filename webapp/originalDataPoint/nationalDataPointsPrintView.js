import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import DataSources from './components/dataSources'
import NationalClasses from './components/nationalClasses'
import ExtentOfForestSection from './components/originalData/extentOfForestSection'
import ForestCharacteristicsSection from './components/originalData/forestCharacteristicsSection'

import { fetchOdps } from './actions'

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
          printView={true}/>
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
          printView={true}/>
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

class NationalDataPointsPrintView extends React.PureComponent {

  componentDidMount () {
    const countryIso = this.props.match.params.countryIso
    this.props.fetchOdps(countryIso)
  }

  render () {
    const { ndps, i18n } = this.props

    const data = ndps && !R.isEmpty(ndps)
      ? ndps.sort((a, b) => Number(a.year) - Number(b.year))
      : null

    return data
      ? (
        <div>
          <h2 className="headline">{i18n.t('nationalDataPoint.nationalData')}</h2>
          <DataSourcesPrintView {...this.props} ndps={data}/>
          <NationalClassesPrintView {...this.props} ndps={data}/>
          <OriginalDataPrintView {...this.props} ndps={data}/>
        </div>
      )
      : (
        <div>
          <i>{i18n.t('description.loading')}</i>
        </div>
      )
  }
}

const mapStateToProps = state => ({
  ndps: state.originalDataPoint.odps
})

export default connect(mapStateToProps, { fetchOdps })(NationalDataPointsPrintView)
