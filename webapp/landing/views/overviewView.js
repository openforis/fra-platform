import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import MapViewContainer from './countryMap/mapViewContainer'

const milestonesTableContent = [
  ['milestone1', 'date1'],
  ['milestone2', 'date2'],
  ['milestone3', 'date3'],
  ['milestone4', 'date4'],
  ['milestone5', 'date5'],
  ['milestone6', 'date6']
]

const Milestones = ({i18n}) => <div className="landing__page-container-item">
  <div className="landing__milestone-container">
    <div className="landing__milestone-header">
      <h2>{i18n.t('landing.milestones.milestones')}</h2>
    </div>
    {milestonesTableContent.map(milestone =>
      <div key={milestone[0]} className="landing__milestone-item">
        <div className="landing__milestone-date">{i18n.t(`landing.milestones.${milestone[1]}`)}</div>
        <div className="landing__milestone-desc">{i18n.t(`landing.milestones.${milestone[0]}`)}</div>
      </div>
    )}
  </div>
</div>

const Logos = () => <div className="landing__page-container-item">
  <img src="img/cfrq_logos.png" className="landing__logos"/>
</div>

class OverviewView extends React.Component {

  render () {
    const {i18n} = this.props

    return <div className="landing__page-container">
      <MapViewContainer {...this.props}/>
      {/*<div className="landing__page-container-item"></div>*/}

      <Milestones {...this.props} />
      <Logos/>

    </div>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
})

export default connect(mapStateToProps)(OverviewView)
