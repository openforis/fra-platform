import './style.less'
import R from 'ramda'
import React from 'react'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import { connect } from 'react-redux'
import { getRelativeDate } from '../utils/relativeDate'
import { fetchAuditFeed } from '../audit/actions'
import { Link } from './../reusableUiComponents/link'

const mapIndexed = R.addIndex(R.map)

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
    return 'dashboard.actions.' + key
  }
  return 'dashboard.actions.edited'
}

const getSectionLocalizationKey = (section) => {
  if (R.contains(section, 'odp')) {
    return 'nationalDataPoint.nationalDataPoint'
  }
  return section + '.' + section
}

const getSectionUrl = (item) => {
  const odpId = R.path(['target', 'odpId'], item)
  if (odpId) {
    return 'odp/' + odpId
  }
  return item.sectionName
}

const LinkList = ({title, items}) => {
  return <ul className="dashboard__list">
    <li className="dashboard__list-heading">
      <h3 className="subhead">{title}</h3>
    </li>
    {
      items.map(item =>
        <li className="dashboard__list-item" key={item.url}>
          <a href={item.url} className="link" target="_blank">{item.name}</a>
        </li>
      )
    }
  </ul>
}

const ActivityItem = ({i18n, countryIso, item}) => {
  const sectionUrl = getSectionUrl(item)
  const sectionLocalizationKey = getSectionLocalizationKey(item.sectionName)
  const actionLocalizationKey = getActionLocalizationKey(item.message)
  const usersManagementLocalaizationParameters = item.target ? {user: item.target.user, role: i18n.t('user.roles.' + item.target.role)} : null

  return <div className="dashboard__activity-item">
    <img className="dashboard__activity-avatar" src={`https://www.gravatar.com/avatar/${item.hash}?default=mm`}/>
    <div className="dashboard__activity-name">
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
    <div className="dashboard__activity-time">{getRelativeDate(item.editTime, i18n)}</div>
  </div>
}

class DashboardView extends React.Component {
  componentWillMount () {
    this.props.fetchAuditFeed(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.props.fetchAuditFeed(this.props.match.params.countryIso)
  }

  render () {
    const {match, i18n, feed} = this.props
    const countryIso = match.params.countryIso
    const externalLinks = [{
      name: 'FRIMS',
      url: 'http://fenix.fao.org/fra2015'
    }, {
      name: 'SEPAL',
      url: 'https://sepal.io/'
    }, {
      name: i18n.t('dashboard.externalLinks.unFcccReportedData'),
      url: 'http://unfccc.int/national_reports/annex_i_ghg_inventories/national_inventories_submissions/items/9492.php'
    }, {
      name: 'FAOSTAT',
      url: 'http://www.fao.org/faostat/'
    }, {
      name: i18n.t('dashboard.externalLinks.nationalFocalPoints'),
      url: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php'
    }, {
      name: i18n.t('dashboard.externalLinks.unReddPlatform'),
      url: 'http://redd.unfccc.int/submissions.html'
    }]

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="dashboard__page-header">
          <h1 className="title">FRA Platform</h1>
        </div>
        <div className="dashboard__container">
          <div className="dashboard__main">
            <div className="dashboard__header">
              <ul className="dashboard__list">
                <li className="dashboard__list-heading">
                  <h3 className="subhead">{i18n.t('dashboard.timeline')}</h3>
                </li>
                <li className="dashboard__list-item">
                  <div className="dashboard__list-icon">
                    <svg className="icon"><use xlinkHref="img/icons.svg#checkbox"/></svg>
                  </div>
                  <span className="dashboard__list-item-year">09.11.2017</span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </li>
                <li className="dashboard__list-item">
                  <div className="dashboard__list-icon">
                    <svg className="icon"><use xlinkHref="img/icons.svg#checkbox"/></svg>
                  </div>
                  <span className="dashboard__list-item-year">09.11.2017</span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </li>
                <li className="dashboard__list-item">
                  <div className="dashboard__list-icon">
                    <svg className="icon"><use xlinkHref="img/icons.svg#checkbox"/></svg>
                  </div>
                  <span className="dashboard__list-item-year">09.11.2017</span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </li>
              </ul>
            </div>
            <h3 className="subhead dashboard__main-title">{i18n.t('dashboard.recentActivity')}</h3>
            {
              R.isNil(feed)
                ? null
                : feed.length > 0
                  ? mapIndexed((item, index) =>
                    <ActivityItem
                      key={index}
                      i18n={i18n}
                      countryIso={countryIso}
                      item={item}
                    />, feed)
                  : <div className="dashboard__activity-empty">
                      <img src="img/tucan.svg" height="72"/>
                      <p className="dashboard__activity-empty-title">{i18n.t('dashboard.noRecentActivityTitle')}</p>
                      <p>{i18n.t('dashboard.noRecentActivityBody')}</p>
                    </div>
            }
          </div>
          <div className="dashboard__sidebar">
            <LinkList
              title={i18n.t('dashboard.externalLinks.title')}
              items={externalLinks}/>
            <div className="dashboard__block">
              <h3 className="subhead dashboard__block-heading">{i18n.t('dashboard.about')}</h3>
              <p>{i18n.t('dashboard.fraProcess')}</p>
              <a href="http://www.fao.org/forest-resources-assessment/en/" target="_blank" className="link">{i18n.t('dashboard.linkFraProcess')}</a>
            </div>
            <div className="dashboard__block">
              <h3 className="subhead dashboard__block-heading">{i18n.t('dashboard.contact')}</h3>
              <p>
                Firstname Lastname<br/>
                firstname.lastname@fao.org<br/>
                +358 40 123 4567
              </p>
              <p>
                Firstname Lastname<br/>
                firstname.lastname@fao.org<br/>
                +358 40 123 4567
              </p>
            </div>
            <img src="img/cfrq_logos.png" className="dashboard__logos"/>
            <div className="dashboard__version">{i18n.t('navigation.support.platformVersion')} {__PLATFORM_VERSION__}</div>
          </div>
        </div>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({i18n: state.user.i18n, feed: state.dashboard.feed})

export default connect(mapStateToProps, {fetchAuditFeed})(DashboardView)
