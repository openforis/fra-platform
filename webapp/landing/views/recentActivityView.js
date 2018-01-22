import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { getRelativeDate } from '../../utils/relativeDate'
import { fetchAuditFeed } from '../../audit/actions'
import { Link } from '../../reusableUiComponents/link'
import camelize from 'camelize'

const getActionLocalizationKey = (message) => {
  const messageToKey = {
    createIssue: 'commented',
    createComment: 'commented',
    markAsResolved: 'resolved',
    deleteOdp: 'deleted',
    createOdp: 'added',
    addUser: 'addUser', //Legacy, no longer created
    updateUser: 'updateUser',
    removeUser: 'removeUser',
    acceptInvitation: 'acceptInvitation',
    addInvitation: 'addInvitation',
    removeInvitation: 'removeInvitation',
    updateInvitation: 'updateInvitation'
  }
  const key = messageToKey[message]
  if (key) {
    return 'landing.recentActivity.actions.' + key
  }
  return 'landing.recentActivity.actions.edited'
}

const getSectionLocalizationKey = (section) => {
  if (R.contains(section, 'odp')) {
    return 'nationalDataPoint.nationalDataPoint'
  }
  return section + '.' + section
}

const getSectionUrl = (item, fra) => {
  const odpId = R.path(['target', 'odpId'], item)
  const odpExists = R.path(['odpId', odpId], fra)
  if (odpExists) {
    return 'odp/extentOfForest/' + odpId
  }
  return item.sectionName
}

const ActivityItem = ({i18n, countryIso, item, fra}) => {
  const sectionUrl = getSectionUrl(item, fra)
  const sectionLocalizationKey = getSectionLocalizationKey(item.sectionName)
  const actionLocalizationKey = getActionLocalizationKey(item.message)
  const usersManagementLocalaizationParameters = item.target ? {
    user: item.target.user,
    role: item.target.role
      ? i18n.t('user.roles.' + camelize(item.target.role.toLowerCase()))
      : null
  } : null

  return <div className="landing__activity-item">
    <img className="landing__activity-avatar" src={`https://www.gravatar.com/avatar/${item.hash}?default=mm`}/>
    <div className="landing__activity-name">
      <strong>{item.fullName}</strong>
      <span>{item.target ? i18n.t(actionLocalizationKey, usersManagementLocalaizationParameters) : i18n.t(actionLocalizationKey)}</span>
      {
        sectionUrl === 'users'
          ? null
          : sectionUrl === 'odp' || actionLocalizationKey === 'dashboard.actions.deleted'
          ? <span>{i18n.t(sectionLocalizationKey)}</span>
          : <Link className="link" to={`/country/${countryIso}/${sectionUrl}`}>{i18n.t(sectionLocalizationKey)}</Link>
      }
    </div>
    <div className="landing__activity-time">{getRelativeDate(item.editTime, i18n)}</div>
  </div>
}

class RecentActivityView extends React.Component {

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetchAuditFeed(countryIso)
  }

  render () {
    const countryIso = this.props.match.params.countryIso
    const {i18n, feed, extentOfForest} = this.props

    return <div className="landing__page-container">
      {
        R.isNil(feed)
          ? null
          : feed.length > 0
          ? feed.map((item, index) =>
            <ActivityItem
              key={index}
              i18n={i18n}
              countryIso={countryIso}
              item={item}
              fra={extentOfForest.fra}
            />)
          : <div className="landing__activity-empty">
            <img src="img/tucan.svg" height="72"/>
            <p className="landing__activity-empty-title">{i18n.t('landing.recentActivity.noRecentActivityTitle')}</p>
            <p>{i18n.t('landing.recentActivity.noRecentActivityBody')}</p>
            <Link className="btn-s btn-primary"
                  to={`/country/${countryIso}/contactPersons`}>{i18n.t('landing.recentActivity.getStarted')}</Link>
          </div>
      }

    </div>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  feed: state.dashboard.feed,
  extentOfForest: state.extentOfForest
})

export default connect(mapStateToProps, {fetchAuditFeed})(RecentActivityView)
