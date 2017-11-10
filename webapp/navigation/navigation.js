import * as R from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Route from 'route-parser'
import { getCountryName, getCountryAlpha2 } from '../../common/country'
import { getRelativeDate } from '../utils/relativeDate'

import { Link } from './../reusableUiComponents/link'
import { follow } from './../router/actions'
import {
  getCountryList,
  fetchCountryOverviewStatus,
  changeAssessment,
  navigationScroll
} from './actions'
import { fra2020Items } from './items'
import { roleForCountry } from '../../common/countryRole'
import { allowedToChangeRoles } from '../../common/userManagementAccessControl'
import { isAdministrator } from '../../common/countryRole'
import { getAllowedStatusTransitions } from '../../common/assessment'
import { PopoverControl } from './../reusableUiComponents/popoverControl'

import './style.less'

class CountrySelectionItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = {isOpen: false}
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  outsideClick (evt) {
    if (!this.refs.navCountryItem.contains(evt.target))
      this.setState({isOpen: false})
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  render () {
    const countryIso = this.props.name
    const role = this.props.role
    const countries = this.props.countries || []
    const i18n = this.props.i18n
    const style = {
      backgroundImage: `url('/img/flags/1x1/${getCountryAlpha2(countryIso).toLowerCase()}.svg'`
    }

    return <div className="nav__country-item" ref="navCountryItem" onClick={() => {
      this.setState({isOpen: R.not(this.state.isOpen)})
      if (R.isEmpty(countries)) {
        this.props.listCountries()
      }
    }}>
      <div className="nav__country-flag" style={style}></div>
      <div className="nav__country-info">
        <span className="nav__country-name">{getCountryName(countryIso, i18n.language)}</span>
        <span className="nav__country-role">{role}</span>
      </div>
      <svg className="icon">
        <use xlinkHref="img/icons.svg#small-down"/>
      </svg>
      <CountryList isOpen={this.state.isOpen} countries={countries} currentCountry={countryIso}
                   i18n={i18n}/>
    </div>
  }
}

const CountryList = ({isOpen, countries, currentCountry, i18n}) => {
  if (!isOpen) return null
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        R.pipe(
          R.toPairs,
          R.map(pair => <CountryRole key={pair[0]} role={pair[0]} roleCountries={pair[1]} currentCountry={currentCountry} i18n={i18n}  />
          )
        )(countries)
      }
    </div>
  </div>
}

const AssessmentStatus = ({status}) => <div className={`status-${status}`} />

const CountryRole = ({role, roleCountries, currentCountry, i18n}) =>
  <div className="nav__country-list-section">
    <div className="nav__country-list-header">
      <span className="nav__country-list-header-primary">{i18n.t(`user.roles.${role.toLowerCase()}`)}</span>
      <span className="nav__country-list-header-secondary">{i18n.t('countryListing.fra2020')}</span>
      <span className="nav__country-list-header-secondary">{i18n.t('audit.edited')}</span>
    </div>
    {
      roleCountries.map(c =>
        <CountryRow key={c.countryIso} selectedCountry={currentCountry} country={c} i18n={i18n}/>
      )
    }
  </div>

const CountryRow = ({selectedCountry, country, i18n}) => {
  return <Link
    to={`/country/${country.countryIso}`}
    className={`nav__country-list-item ${R.equals(selectedCountry, country.countryIso) ? 'selected' : ''}`}>
    <div className="nav__country-list-item-primary">
      {getCountryName(country.countryIso, i18n.language)}
    </div>
    {
      country.fra2020Assessment
        ? <span
        className="nav__country-list-item-secondary"><AssessmentStatus
        status={country.fra2020Assessment}/>{i18n.t(`navigation.assessmentStatus.${country.fra2020Assessment}.label`)}</span>
        : null
    }
    <span className="nav__country-list-item-secondary">{getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted')}</span>
  </Link>
}

const PrimaryItem = ({label, countryIso, assessmentType, assessments, changeAssessment, userInfo, i18n}) => {
  const assessment = R.path([assessmentType], assessments)
  if (!countryIso || !userInfo || !assessment)
    return null
  const currentAssessmentStatus = assessment.status
  const allowedTransitions = getAllowedStatusTransitions(roleForCountry(countryIso, userInfo), currentAssessmentStatus)
  const possibleAssesmentStatuses = [
    {direction: 'next', transition: allowedTransitions.next},
    {direction: 'previous', transition: allowedTransitions.previous}
  ]
  const allowedAssesmentStatuses = R.filter(R.prop('transition'), possibleAssesmentStatuses)
  const assessmentStatusItems = R.map(targetStatus => ({
    content: i18n.t(`navigation.assessmentStatus.${targetStatus.transition}.${targetStatus.direction}`),
    onClick: () => changeAssessment(countryIso, {...assessment, status: targetStatus.transition})
  }), allowedAssesmentStatuses)
  const deskStudyItems = [{
    divider: true
  }, {
    content: <div className="popover-control__checkbox-container">
      <span className={`popover-control__checkbox ${assessment.deskStudy ? 'checked' : ''}`}></span>
      <span>{i18n.t('navigation.assessmentDeskStudy')}</span>
    </div>,
    onClick: () => currentAssessmentStatus !== 'changing'
      ? changeAssessment(countryIso, {...assessment, deskStudy: !assessment.deskStudy})
      : null
  }]
  const popoverItems = isAdministrator(userInfo)
    ? R.flatten(R.append(deskStudyItems, assessmentStatusItems))
    : assessmentStatusItems

  return <div className="nav__primary-item">
    <div className="nav__primary-label">{assessment.deskStudy ? label + ' (Desk study)' : label}</div>
    <PopoverControl items={popoverItems}>
      <div className={`nav__primary-assessment-status status-${currentAssessmentStatus} actionable-${!R.isEmpty(popoverItems)}`}>
        <span>{i18n.t(`navigation.assessmentStatus.${currentAssessmentStatus}.label`)}</span>
        {
          !R.isEmpty(popoverItems)
          ? <svg className="icon icon-white icon-middle"><use xlinkHref="img/icons.svg#small-down"/></svg>
          : null
        }
      </div>
    </PopoverControl>

  </div>
}

const ReviewStatus = ({status}) =>
  status.issueStatus === 'opened'
    ? <div className={`nav__has-open-issue${status.hasUnreadIssues ? ' has-unread-issue' : ''}`}/>
    : null

const DashboardItem = ({path, countryIso, pathTemplate, label}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <div className='nav__link-label'>{label}</div>
  </Link>
}

const NationalDataItem = ({path, countryIso, pathTemplate, secondaryPathTemplate, status, label, userInfo}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})
  const secondaryLinkTo = new Route(secondaryPathTemplate).reverse({countryIso})

  return <Link className={`nav__link-item ${R.any(linkTo => R.startsWith(linkTo, path), [linkTo, secondaryLinkTo]) ? 'selected' : ''}`}
               to={linkTo}>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-item-count">{status.count}</span>
    <div className="nav__link-status-content">
      <ReviewStatus status={status} />
      <div className="nav__link-error-status">
        {status.errors ? <svg className="icon icon-middle icon-red">
            <use xlinkHref="img/icons.svg#alert"/>
          </svg>
          : null
        }
      </div>
    </div>
  </Link>
}

const SecondaryItemHeader = ({sectionNo, label}) => {
  return <div className="nav__secondary-item-header">
    <div className="nav__secondary-order">{sectionNo}</div>
    <div className="nav__secondary-label">{label}</div>
  </div>
}

const SecondaryItem = ({path, countryIso, status, pathTemplate, tableNo, label}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link
    className={`nav__secondary-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
              to={linkTo}>
    <div className='nav__secondary-order'>{tableNo}</div>
    <div className='nav__secondary-label'>{label}</div>
    <div className="nav__secondary-status-content">
      <ReviewStatus status={status} />
    </div>
  </Link>
}

const roleLabel = (countryIso, userInfo, i18n) => i18n.t(roleForCountry(countryIso, userInfo).labelKey)

const UsersManagementItem = ({i18n, countryIso, path, pathTemplate}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link
      className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
      to={linkTo}>
      <div className='nav__link-label'>{i18n.t('navigation.support.manageCollaborators')}</div>
    </Link>
}

const SuppportItems = ({i18n, userInfo, countryIso, path}) => {
  const currentYear = new Date().getFullYear()
  const newLine = `%0D%0A`
  const subject = i18n.t('navigation.support.feedbackEmailSubject')
  const body = `
${newLine}${newLine}
*** ${i18n.t('navigation.support.dontDelete')} ***
${newLine}${newLine}
${i18n.t('navigation.support.user')}: ${userInfo.name} (${userInfo.id})
${newLine}
${i18n.t('navigation.support.platformVersion')}: ${__PLATFORM_VERSION__}
${newLine}
${i18n.t('navigation.support.userAgent')}: ${navigator.userAgent}
`
  return <div className="nav__support-item">
    <a
      className="nav__support-link"
      target="_top"
      href={`mailto:fra@fao.org?subject=${subject}&body=${body}`}>
      {i18n.t('navigation.support.sendFeedback')}
    </a>
    <span className="nav__copyright-item">&copy; {currentYear} FAO</span>
  </div>
}

class Nav extends React.Component {

  componentDidMount () {
    const content = ReactDOM.findDOMNode(this.refs.scroll_content)
    if (this.props.scrollPosition) {
      content.scrollTop = this.props.scrollPosition
    }
  }

  render () {
    const status = R.defaultTo({}, this.props.status)
    const getReviewStatus = section => R.pipe(
      R.defaultTo({}),
      R.prop(section),
      R.defaultTo({issuesCount: 0})
    )(status.reviewStatus)

    const {userInfo, i18n, path, countries, country, changeAssessment, getCountryList} = this.props

    return <div className="fra-nav__container">
      <div className="fra-nav">
        <CountrySelectionItem name={country}
                              countries={countries}
                              listCountries={getCountryList}
                              role={roleLabel(country, userInfo, i18n)}
                              i18n={i18n}/>
        <div className="nav__link-list" ref="scroll_content" onScroll={() => {
          const content = ReactDOM.findDOMNode(this.refs.scroll_content)
          this.props.navigationScroll(content.scrollTop)
        }}>
          <div>
            <DashboardItem label={i18n.t('dashboard.dashboard')}
                           countryIso={country}
                           path={path}
                           pathTemplate="/country/:countryIso"/>
            <NationalDataItem label={i18n.t('nationalDataPoint.nationalData')}
                              countryIso={country}
                              status={R.merge(getReviewStatus('odp'), status.odpStatus)}
                              path={path}
                              pathTemplate="/country/:countryIso/odps"
                              secondaryPathTemplate="/country/:countryIso/odp"
                              userInfo={userInfo}/>

            <div className="nav__divider"></div>

            <PrimaryItem label={i18n.t('navigation.fra2020')}
                         countryIso={country}
                         assessmentType="fra2020"
                         assessments={status.assessments}
                         changeAssessment={changeAssessment}
                         userInfo={userInfo}
                         i18n={i18n}/>
            {
              fra2020Items(i18n).map(item =>
                item.type === 'header'
                  ? <SecondaryItemHeader key={item.label}
                                         label={item.label}
                                         sectionNo={item.sectionNo}/>
                  : <SecondaryItem path={path}
                                   key={item.label}
                                   countryIso={country}
                                   status={getReviewStatus(item.section)}
                                   {...item} />
              )
            }

            <div className="nav__divider"/>
            {
              !R.isEmpty(allowedToChangeRoles(country, userInfo))
                  ? <UsersManagementItem
                      countryIso={country}
                      i18n={i18n}
                      path={path}
                      pathTemplate="/country/:countryIso/users"/>
                  : null
            }
            <SuppportItems countryIso={country} {...this.props} />
          </div>
        </div>
      </div>
    </div>
  }
}

class NavigationSync extends React.Component {

  componentWillMount () {
    this.props.fetchCountryOverviewStatus(this.props.country)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.country, next.country)) {
      this.props.fetchCountryOverviewStatus(next.country)
    }
  }

  render () {
    if (this.props.navigationVisible) {
      return <Nav {...this.props} />
    }
    return null
  }
}

const mapStateToProps = state => ({
  ...state.navigation,
  ...state.router,
  ...state.user
})

export default connect(mapStateToProps, {
  follow,
  getCountryList,
  fetchCountryOverviewStatus,
  changeAssessment,
  navigationScroll
})(NavigationSync)
