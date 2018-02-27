import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import {i18nUserRole, profilePictureUri} from '../../../common/userUtils'

import Icon from '../../reusableUiComponents/icon'
// import MapViewContainer from './countryMap/mapViewContainer'

import { getCountryOverview } from '../actions'
import { openChat, closeChat } from '../../userChat/actions'

const milestonesTableContent = [
  {
    year: '2018', milestones: [
      {key: 'milestone1', date: 'date1'},
      {key: 'milestone2', date: 'date2'},
      {key: 'milestone3', date: 'date3'}
    ]
  },
  {
    year: '2019', milestones: [
      {key: 'milestone4', date: 'date4'},
      {key: 'milestone7', date: 'date7'}
    ]
  },
  {
    year: '2020', milestones: [
      {key: 'milestone5', date: 'date5'},
      {key: 'milestone6', date: 'date6'},
      {key: 'milestone8', date: 'date8'}
    ]
  }
]

const Milestones = ({i18n}) => <div className="landing__milestones-container">
  <div className="landing__milestones-header">
    <h3>{i18n.t('landing.milestones.milestones')}</h3>
  </div>
  <div className="landing__milestones-content">
    {
      milestonesTableContent.map(obj =>
        <div className="landing__milestone-group-item" key={obj.year}>
          <div className="landing__milestone-group-year">
            {obj.year}
          </div>
          {obj.milestones.map(milestone =>
            <div key={milestone.key} className="landing__milestone-item">
              <div className="landing__milestone-item-date">{i18n.t(`landing.milestones.${milestone.date}`)}</div>
              <div className="landing__milestone-item-desc">{i18n.t(`landing.milestones.${milestone.key}`)}</div>
            </div>
          )}
        </div>
      )}
  </div>
</div>

const Users = ({countryIso, i18n, users, userInfo, openChat}) => <div className="landing__users-container">
  <div className="landing__users-header">
    <h3>{i18n.t('landing.users.users')}</h3>
  </div>
  {
    users.map(user =>
      <div key={user.id} className="landing__user-outer-container">
        <div className="landing__user-container">
          <div className="landing__user-header">
            <img
              className="landing__user-avatar"
              src={profilePictureUri(countryIso, user.id)}/>
            <div className="landing__user-info">

              <div className={`landing__user-name${userInfo.id === user.id ? ' session-user' : ''}`}>
                {user.name}
              </div>
              <div className="landing__user-role">
                {i18nUserRole(i18n, user.role)}
              </div>
              { // add message button if session user is not equal to current displayed user
                R.prop('id', userInfo) !== user.id
                  ? <button
                    className="landing__user-btn-message"
                    onClick={() => openChat(countryIso, userInfo, user)}
                  >
                    <Icon name="chat-46" className="icon-middle"/>
                    {i18n.t('landing.users.message')}
                    {
                      user.chat.unreadMessages > 0
                        ? <div className="landing__user-message-count">{user.chat.unreadMessages}</div>
                        : null
                    }
                  </button>
                  : null
              }
            </div>
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
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso)){
      this.props.closeChat()
      this.getCountryOverview(next.match.params.countryIso)
    }
  }

  componentWillUnmount () {
    this.props.closeChat()
  }

  getCountryOverview (countryIso) {
    this.props.getCountryOverview(countryIso)
  }

  render () {
    const countryIso = this.props.match.params.countryIso
    const {overview, i18n, userInfo, openChat} = this.props
    const users = overview && overview.users

    return <div className="landing__page-container">
      {/*<MapViewContainer {...this.props}/>*/}
      <Milestones {...this.props} />
      {
        R.isEmpty(users) || R.isNil(users)
          ? null
          : <Users users={users}
                   countryIso={countryIso}
                   i18n={i18n}
                   userInfo={userInfo}
                   openChat={openChat}/>
      }

    </div>
  }
}

const mapStateToProps = state => ({
  ...state.landing,
  ...state.user
})

export default connect(mapStateToProps, {
  getCountryOverview,
  openChat,
  closeChat
})(OverviewView)
