import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import camelize from 'camelize'
import { getCountryOverview } from '../actions'
import { openChat, closeChat } from '../../userChat/actions'

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
      <h3>{i18n.t('landing.milestones.milestones')}</h3>
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

const Users = ({i18n, users, userInfo, openChat}) => <div className="landing__users-container">
  <div className="landing__milestone-header">
    <h3>{i18n.t('landing.users.users')}</h3>
  </div>
  {
    users.map(user =>
      <div key={user.id} className="landing__user-container">
        <div className="landing__user-header">
          <img
            className="landing__user-avatar"
            src={`https://www.gravatar.com/avatar/${user.hash}?default=mm`}/>
          <div className="landing__user-info">

            <div className="landing__user-name">
              {user.name}
            </div>
            <div className="landing__user-role">
              {i18n.t(`user.roles.${camelize(user.role.toLowerCase())}`)}
            </div>
            { // add message button if session user is not equal to current displayed user
              R.prop('id', userInfo) !== user.id
                ? <button
                  className="landing__user-btn-message"
                  onClick={() => openChat(R.path(['chat', 'id'], user), userInfo.id, user.id)}
                >{
                  i18n.t('landing.users.message')}
                  {
                    user.chat
                      ? <span className="landing__user-message-count">{user.chat.unreadMessages}</span>
                      : null
                  }
                </button>
                : null
            }
          </div>
        </div>
      </div>
    )}
</div>

class OverviewView extends React.Component {

  componentWillMount () {
    this.getCountryOverview(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.getCountryOverview(next.match.params.countryIso)
  }

  componentWillUnmount () {
    this.props.closeChat()
  }

  getCountryOverview (countryIso) {
    this.props.getCountryOverview(countryIso)
  }

  render () {
    const {overview} = this.props
    const users = overview && overview.users

    return <div className="landing__page-container">
      <MapViewContainer {...this.props}/>
      <Milestones {...this.props} />
      {
        R.isEmpty(users) || R.isNil(users)
          ? null
          : <Users users={users} {...this.props}/>
      }
      <Logos/>

    </div>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  ...state.landing,
  ...state.user
})

export default connect(mapStateToProps, {
  getCountryOverview,
  openChat,
  closeChat
})(OverviewView)
