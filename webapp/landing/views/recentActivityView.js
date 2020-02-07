import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as R from 'ramda'

import { i18nUserRole, profilePictureUri } from '@common/userUtils'

import { getRelativeDate } from '@webapp/utils/relativeDate'
import { fetchAuditFeed } from '@webapp/audit/actions'
import { Link } from 'react-router-dom'

import * as UserState from '@webapp/user/userState'
import * as LandingState from '@webapp/landing/landingState'

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
    updateInvitation: 'updateInvitation',
    updateAssessmentStatus: 'updateAssessmentStatus',
    fileRepositoryUpload: 'addedFile',
    fileRepositoryDelete: 'deletedFile'
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
  if (section === 'fileRepository') {
    return 'landing.sections.links'
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

const getMessageParams = (item, i18n) =>
  item.target.user
    ? {
      user: item.target.user,
      role: item.target.role
        ? i18nUserRole(i18n, item.target.role)
        : null
    }
    : item.target.assessment
    ? {
      assessment: i18n.t(`assessment.${item.target.assessment}`),
      status: i18n.t(`assessment.status.${item.target.status}.label`)
    }
    : item.target.file
      ? {file: item.target.file}
      : {}

const ActivityItem = ({i18n, countryIso, item, fra}) => {
  const sectionUrl = getSectionUrl(item, fra)
  const sectionLocalizationKey = getSectionLocalizationKey(item.sectionName)
  const actionLocalizationKey = getActionLocalizationKey(item.message)

  return <div className="landing__activity-item">
    <img className="landing__activity-avatar" src={profilePictureUri(countryIso, item.userId)}/>
    <div className="landing__activity-name">
      <strong>{item.fullName}</strong>
      <span>{
        item.target
          ? i18n.t(actionLocalizationKey, getMessageParams(item, i18n))
          : i18n.t(actionLocalizationKey)
      }</span>
      {
        // excluding section link when section is users or assessment
        R.contains(sectionUrl, ['users', 'assessment'])
          ? null
          : R.contains(sectionUrl, ['odp', 'fileRepository']) || actionLocalizationKey === 'dashboard.actions.deleted'
          ? <span>{i18n.t(sectionLocalizationKey)}</span>
          : <Link className="link" to={`/country/${countryIso}/${sectionUrl}`}>{i18n.t(sectionLocalizationKey)}</Link>
      }
    </div>
    <div className="landing__activity-time">{getRelativeDate(item.editTime, i18n)}</div>
  </div>
}

class RecentActivityView extends React.Component {

  componentDidMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCountryIso = this.props.match.params.countryIso
    const previousCountryIso = prevProps.match.params.countryIso
    if (!R.equals(currentCountryIso, previousCountryIso))
      this.fetch(currentCountryIso)
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
            <img src="/img/tucan.svg" height="72"/>
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
  i18n: UserState.getI18n(state),
  feed: LandingState.getFeed(state),
  extentOfForest: state.extentOfForest
})

export default withRouter(connect(mapStateToProps, {fetchAuditFeed})(RecentActivityView))
