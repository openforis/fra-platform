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
  const isOdp = R.contains(item.sectionName, ['odp','NDP']) ? 'nationalDataPoint' : item.sectionName
  const sectionName = isOdp+'.'+isOdp
  const localizedSectionName = i18n.t(sectionName) !== sectionName ? i18n.t(sectionName) : item.sectionName
  const odpId = R.path(['target', 'odpId'], item)
  const sectionUrl = odpId ? item.sectionName+'/'+odpId : item.sectionName
  const message = R.contains(item.message, ['createComment', 'deleteComment']) ? 'dashboard.actions.commented' : 'dashboard.actions.edited'

  return <div className="dashboard__activity-item">
    <img className="dashboard__activity-avatar" src={`https://www.gravatar.com/avatar/${item.hash}?default=mm`} />
    <div className="dashboard__activity-name">
      <strong>{item.fullName}</strong>
      <span>{i18n.t(message)}</span>
      <Link className="link" to={`/country/${countryIso}/${sectionUrl}`}>{localizedSectionName}</Link>
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
    const countryFlagUrl = `/img/flags/4x3/${(alpha3ToAlpha2(countryIso)).toLowerCase()}.svg`
    const externalLinks = [{
      name: 'FRIMS',
      url: 'http://fenix.fao.org/fra2015'
    },{
      name: 'SEPAL',
      url: 'https://sepal.io/'
    },{
      name: i18n.t('dashboard.externalLinks.unfcccReportedData'),
      url: 'http://unfccc.int/national_reports/annex_i_ghg_inventories/national_inventories_submissions/items/9492.p'
    },{
      name: 'FAOSTAT',
      url: 'http://www.fao.org/faostat/en/'
    },{
      name: i18n.t('dashboard.externalLinks.nationalFocalPoints'),
      url: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php'
    }]

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="dashboard__page-header">
          {countryFlagUrl ? <img className="flag" src={countryFlagUrl} alt={countryIso} height="32" /> : null}
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
