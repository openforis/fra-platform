import * as R from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Route from 'route-parser'
import { getCountryName, getCountryAlpha2 } from '../../common/country'
import { getRelativeDate } from '../utils/relativeDate'

import { Link } from './../reusableUiComponents/link'
import Icon from '../reusableUiComponents/icon'
import { follow } from './../router/actions'
import { changeAssessment, navigationScroll, toggleNavigationGroupCollapse } from './actions'
import { getCountryList, fetchCountryOverviewStatus } from '../country/actions'
import { assessments } from './items'
import { roleForCountry } from '../../common/countryRole'
import { allowedToChangeRoles } from '../../common/userManagementAccessControl'
import { isAdministrator } from '../../common/countryRole'
import { getAllowedStatusTransitions } from '../../common/assessment'
import { PopoverControl } from '../reusableUiComponents/popoverControl'

import './style.less'

class CountrySelection extends React.Component {

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
      <Icon name="small-down"/>
      <CountryList
        isOpen={this.state.isOpen}
        countries={countries}
        currentCountry={countryIso}
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
        status={country.fra2020Assessment}/>{i18n.t(`assessment.status.${country.fra2020Assessment}.label`)}</span>
        : null
    }
    <span className="nav__country-list-item-secondary">{getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted')}</span>
  </Link>
}

const Dashboard = ({path, countryIso, pathTemplate, label}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <div className='nav__link-label'>{label}</div>
  </Link>
}

const ReviewStatus = ({status}) =>
  status.issueStatus === 'opened'
    ? <div className={`nav__has-open-issue${status.hasUnreadIssues ? ' has-unread-issue' : ''}`}/>
    : null

const NationalData = ({path, countryIso, pathTemplate, secondaryPathTemplate, status, label, userInfo}) => {
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
        {
          status.errors
            ? <Icon className="icon-middle icon-red" name="alert"/>
            : null
        }
      </div>
    </div>
  </Link>
}

const Assessment = ({assessment, countryIso, status, changeAssessment, userInfo, sections, i18n, ...props}) => {
  const currentAssessment = R.path([assessment], status)
  if (!countryIso || !userInfo || !currentAssessment) return null
  const currentAssessmentStatus = currentAssessment.status
  const assesmentIsChanging = currentAssessmentStatus === 'changing'
  const allowedTransitions = getAllowedStatusTransitions(roleForCountry(countryIso, userInfo), currentAssessmentStatus)
  const possibleAssesmentStatuses = [
    {direction: 'next', transition: allowedTransitions.next},
    {direction: 'previous', transition: allowedTransitions.previous}
  ]
  const allowedAssesmentStatuses = R.filter(R.prop('transition'), possibleAssesmentStatuses)
  const assessmentStatusItems = R.map(targetStatus => ({
    content: i18n.t(`assessment.status.${targetStatus.transition}.${targetStatus.direction}`),
    onClick: () => changeAssessment(countryIso, {...currentAssessment, status: targetStatus.transition})
  }), allowedAssesmentStatuses)
  const deskStudyItems = [{
      divider: true
    }, {
      content: <div className="popover-control__checkbox-container">
        <span className={`popover-control__checkbox ${currentAssessment.deskStudy ? 'checked' : ''}`}></span>
        <span>{i18n.t('assessment.deskStudy')}</span>
      </div>,
      onClick: () => changeAssessment(countryIso, {...currentAssessment, deskStudy: !currentAssessment.deskStudy})
    }]
  const popoverItems = isAdministrator(userInfo)
    ? R.flatten(R.append(deskStudyItems, assessmentStatusItems))
    : assessmentStatusItems
  const allowedPopoverItems = !assesmentIsChanging ? popoverItems : []

  console.log(assessment, sections)

  return <div className="nav__assessment">
    <div className="nav__primary-item">
      <div className="nav__primary-label">
      {
        currentAssessment.deskStudy
          ? i18n.t('assessment.' + assessment) + ' (' + i18n.t('assessment.deskStudy') + ')'
          : i18n.t('assessment.' + assessment)
      }
      </div>
      <PopoverControl items={allowedPopoverItems}>
        <div className={`nav__primary-assessment-status status-${currentAssessmentStatus} actionable-${!R.isEmpty(allowedPopoverItems)}`}>
          <span>{i18n.t(`assessment.status.${currentAssessmentStatus}.label`)}</span>
          {
            !R.isEmpty(allowedPopoverItems)
            ? <Icon className="icon-white icon-middle" name="small-down"/>
            : null
          }
        </div>
      </PopoverControl>
    </div>
    {
      R.map(item =>
        <AssesmentSection
          key={item.label}
          countryIso={countryIso}
          item={item}
          assessment={assessment}
          i18n={i18n}
          {...props}
          />
      , sections)
    }
  </div>
}

const AssesmentSection = ({countryIso, item, assessment, i18n, ...props}) => {
  return <div className="nav__group" key={item.sectionNo}>
    <div className="nav__secondary-item-header" onClick={() => props.toggleNavigationGroupCollapse(assessment, item.sectionNo)}>
      <div className="nav__secondary-order">{item.sectionNo}</div>
      <div className="nav__secondary-label">{i18n.t(item.label)}</div>
    </div>
    <div className={props.navigationGroupCollapseState[assessment][item.sectionNo] ? 'nav__group-children--visible' : 'nav__group-children--hidden'}>
      {
        R.map(child => {
          const route = new Route(child.pathTemplate)
          const linkTo = route.reverse({countryIso})

          return <Link
            key={child.tableNo}
            className={`nav__secondary-item ${R.equals(props.path, linkTo) ? 'selected' : ''}`}
            to={linkTo}>
              <div className='nav__secondary-order'>{child.tableNo}</div>
              <div className='nav__secondary-label'>{i18n.t(child.label)}</div>
              <div className="nav__secondary-status-content">
                <ReviewStatus status={props.getReviewStatus(child.section)} />
              </div>
            </Link>
        }
        , item.children)
      }
    </div>
  </div>
}

const UsersManagement = ({i18n, countryIso, path, pathTemplate}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link
      className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
      to={linkTo}>
      <div className='nav__link-label'>{i18n.t('navigation.support.manageCollaborators')}</div>
    </Link>
}

const SuppportLinks = ({i18n, userInfo, countryIso, path}) => {
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

const roleLabel = (countryIso, userInfo, i18n) => i18n.t(roleForCountry(countryIso, userInfo).labelKey)

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
        <CountrySelection name={country}
                              countries={countries}
                              listCountries={getCountryList}
                              role={roleLabel(country, userInfo, i18n)}
                              i18n={i18n}/>
        <div className="nav__link-list" ref="scroll_content" onScroll={() => {
          const content = ReactDOM.findDOMNode(this.refs.scroll_content)
          this.props.navigationScroll(content.scrollTop)
        }}>
          <div>
            <Dashboard
              label={i18n.t('dashboard.dashboard')}
              countryIso={country}
              path={path}
              pathTemplate="/country/:countryIso"/>
            <NationalData
              label={i18n.t('nationalDataPoint.nationalData')}
              countryIso={country}
              status={R.merge(getReviewStatus('odp'), status.odpStatus)}
              path={path}
              pathTemplate="/country/:countryIso/odps"
              secondaryPathTemplate="/country/:countryIso/odp"
              userInfo={userInfo}/>
            <div className="nav__divider"></div>
            {
              R.map(([assessment, sections]) =>
              <Assessment
                {...this.props}
                key={assessment}
                assessment={assessment}
                countryIso={country}
                status={status.assessments}
                changeAssessment={changeAssessment}
                userInfo={userInfo}
                sections={sections}
                getReviewStatus={getReviewStatus}
                i18n={i18n}/>
              , R.toPairs(assessments))
            }
            <div className="nav__divider"/>
            {
              !R.isEmpty(allowedToChangeRoles(country, userInfo))
                ? <UsersManagement
                    countryIso={country}
                    i18n={i18n}
                    path={path}
                    pathTemplate="/country/:countryIso/users"/>
                : null
            }
            <SuppportLinks countryIso={country} {...this.props} />
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
  ...state.country,
  ...state.router,
  ...state.user
})

export default connect(mapStateToProps, {
  follow,
  getCountryList,
  fetchCountryOverviewStatus,
  changeAssessment,
  navigationScroll,
  toggleNavigationGroupCollapse
})(NavigationSync)
