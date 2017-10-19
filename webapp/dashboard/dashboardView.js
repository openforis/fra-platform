import './style.less'
import R from 'ramda'
import React from 'react'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { connect } from 'react-redux'
import { alpha3ToAlpha2, getName as getCountryName } from 'i18n-iso-countries'
import { getRelativeDate } from '../utils/relativeDate'
import { fetchAuditFeed } from '../audit/actions'
import { Link } from './../link'

const mapIndexed = R.addIndex(R.map)

const getActionLocalizationKey = (message) => {
  var key = 'dashboard.actions.'
  if (R.contains(message, ['createIssue', 'createComment'])) {
    key += 'commented'
  } else if (R.contains(message, 'markAsResolved')) {
    key += 'resolved'
  } else if (R.contains(message, 'deleteOdp')) {
    key += 'deleted'
  } else if (R.contains(message, 'createOdp')) {
    key += 'added'
  } else {
    key += 'edited'
  }
  return key
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

const LinkList = ({title, links}) => {
  return <ul className="link-list__container">
    <li className="link-list__heading">
      <h3 className="subhead">{title}</h3>
    </li>
    {
      links.map(link =>
      <li className="link-list__item" key={link.url}>
        <a href={link.url} className="link" target="_blank">{link.name}</a>
      </li>
      )
    }
  </ul>
}

const ActivityItem = ({i18n, countryIso, item}) => {
  const sectionUrl = getSectionUrl(item)
  const sectionLocalizationKey = getSectionLocalizationKey(item.sectionName)
  const actionLocalizationKey = getActionLocalizationKey(item.message)

  return <div className="dashboard__activity-item">
    <img className="dashboard__activity-avatar" src={`https://www.gravatar.com/avatar/${item.hash}?default=mm`} />
    <div className="dashboard__activity-name">
      <strong>{item.fullName}</strong>
      <span>{i18n.t(actionLocalizationKey)}</span>
      {
        sectionUrl === 'odp' || actionLocalizationKey === 'dashboard.actions.deleted'
          ? <span className="dashboard__activity-deleted">{i18n.t(sectionLocalizationKey)}</span>
          : <Link className="link" to={`/country/${countryIso}/${sectionUrl}`}>{i18n.t(sectionLocalizationKey)}</Link>
      }
    </div>
    <div className="dashboard__activity-time">{getRelativeDate(item.editTime, i18n)}</div>
  </div>
}

class DashboardView extends React.Component {
  componentWillMount() {
    const countryIso = this.props.match.params.countryIso
    this.props.fetchAuditFeed(countryIso)
  }

  render() {
    const {match, i18n, feed} = this.props
    const countryIso = match.params.countryIso
    const externalLinks = [{
      name: 'FRIMS',
      url: 'http://fenix.fao.org/fra2015'
    },{
      name: 'SEPAL',
      url: 'https://sepal.io/'
    },{
      name: i18n.t('dashboard.externalLinks.unFcccReportedData'),
      url: 'http://unfccc.int/national_reports/annex_i_ghg_inventories/national_inventories_submissions/items/9492.php'
    },{
      name: 'FAOSTAT',
      url: 'http://www.fao.org/faostat/'
    },{
      name: i18n.t('dashboard.externalLinks.nationalFocalPoints'),
      url: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php'
    },{
      name: i18n.t('dashboard.externalLinks.unReddPlatform'),
      url: 'http://redd.unfccc.int/submissions.html'
    }]

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="dashboard__page-header">
          <h1 className="title">{getCountryName(countryIso, i18n.language)}</h1>
        </div>
        <div className="dashboard__container">
          <div className="dashboard__activity">
            <h3 className="subhead">{i18n.t('dashboard.recentActivity')}</h3>
            {
              feed
              ? mapIndexed((item, index) =>
                <ActivityItem
                  key={index}
                  i18n={i18n}
                  countryIso={countryIso}
                  item={item}
                />, feed)
              : null
            }
          </div>
          <div className="dashboard__sidebar">
            <LinkList
              title={i18n.t('dashboard.externalLinks.title')}
              links={externalLinks}/>
          </div>
        </div>
        <div className="dashboard__version">{i18n.t('navigation.support.platformVersion')} {__PLATFORM_VERSION__}</div>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({i18n: state.user.i18n, feed: state.dashboard.feed})

export default connect(mapStateToProps, {fetchAuditFeed})(DashboardView)
