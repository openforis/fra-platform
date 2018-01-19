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
  <table className="landing__table">
    <thead>
    <tr>
      <th>{i18n.t('landing.milestones.milestoneHeader')}</th>
      <th>{i18n.t('landing.milestones.dateHeader')}</th>
    </tr>
    </thead>
    <tbody>
    {
      milestonesTableContent.map((row, i) =>
        <tr key={i}>
          {
            R.map(cell =>
                <td key={cell}>
                  {i18n.t('landing.milestones.' + cell)}
                </td>
              , row)
          }
        </tr>
      )
    }
    </tbody>
  </table>
</div>

const Logos = () => <div className="landing__page-container-item">
  <img src="img/cfrq_logos.png" className="landing__logos"/>
</div>

class OverviewView extends React.Component {

  render () {
    const {i18n} = this.props

    return <div className="landing__page-container">
      <MapViewContainer {...this.props}/>
      <div className="landing__page-container-item"></div>

      <Milestones {...this.props} />
      <Logos/>
      <div className="landing__page-container">
        <div className="landing__version">{i18n.t('navigation.support.platformVersion')} {__PLATFORM_VERSION__}</div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
})

export default connect(mapStateToProps)(OverviewView)
