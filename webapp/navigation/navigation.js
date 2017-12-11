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
import { changeAssessment, navigationScroll, toggleNavigationGroupCollapse, toggleAllNavigationGroupsCollapse } from './actions'
import { getCountryList } from '../country/actions'
import { fetchAllCountryData } from '../app/actions'
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

    return <div className="nav__country" ref="navCountryItem" onClick={() => {
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
        {...this.props}
        isOpen={this.state.isOpen}
        currentCountry={countryIso}
      />
    </div>
  }
}

const CountryList = ({isOpen, countries, ...props}) => {
  if (!isOpen) return null
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        R.pipe(
          R.toPairs,
          R.map(([role, countries]) =>
            <CountryRole key={role} role={role} roleCountries={countries} {...props} />
          )
        )(countries)
      }
    </div>
  </div>
}

const CountryRole = ({role, roleCountries, currentCountry, fetchAllCountryData, i18n}) =>
  <div className="nav__country-list-section">
    <div className="nav__country-list-header">
      <span className="nav__country-list-primary-col">{i18n.t(`user.roles.${role.toLowerCase()}`)}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('countryListing.fra2020')}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('audit.edited')}</span>
    </div>
    {
      R.map(country =>
        <CountryRow key={country.countryIso}
                    selectedCountry={currentCountry}
                    country={country}
                    fetchAllCountryData={fetchAllCountryData}
                    i18n={i18n}/>
      , roleCountries)
    }
  </div>

const CountryRow = ({selectedCountry, country, fetchAllCountryData, i18n}) => {
  return <Link
    to={`/country/${country.countryIso}`}
    className={`nav__country-list-row ${R.equals(selectedCountry, country.countryIso) ? 'selected' : ''}`}
    onClick={() => fetchAllCountryData(country.countryIso)}>
    <span className="nav__country-list-primary-col">
      {getCountryName(country.countryIso, i18n.language)}
    </span>
    {
      country.fra2020Assessment
        ? <span className="nav__country-list-secondary-col">
            <div className={`status-${country.fra2020Assessment}`} />
            {i18n.t(`assessment.status.${country.fra2020Assessment}.label`)}
          </span>
        : null
    }
    <span className="nav__country-list-secondary-col">
      {getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted')}
    </span>
  </Link>
}

const getLinkTo = (pathTemplate, countryIso) => {
  const route = new Route(pathTemplate)
  return route.reverse({countryIso})
}

const Dashboard = ({path, countryIso, pathTemplate, label}) => {
  const linkTo = getLinkTo(pathTemplate, countryIso)
  return <Link className={`nav__link ${R.equals(path, linkTo) ? 'selected' : ''}`} to={linkTo}>
    <div className='nav__link-label'>{label}</div>
  </Link>
}

const ReviewStatus = ({status}) =>
  status.issueStatus === 'opened'
    ? <div className={`nav__review-status--${status.hasUnreadIssues ? 'unread' : 'open'}`}/>
    : null

const NationalData = ({path, countryIso, pathTemplate, secondaryPathTemplate, status, label, userInfo}) => {
  const linkTo = getLinkTo(pathTemplate, countryIso)
  const secondaryLinkTo = getLinkTo(secondaryPathTemplate, countryIso)

  return <Link className={`nav__link ${R.any(linkTo => R.startsWith(linkTo, path), [linkTo, secondaryLinkTo]) ? 'selected' : ''}`}
               to={linkTo}>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-count">{status.count}</span>
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

  return <div className="nav__assessment">
    <div className="nav__assessment-header">
      <div className="nav__assessment-label">
      {
        currentAssessment.deskStudy
          ? `${i18n.t('assessment.' + assessment)} (${i18n.t('assessment.deskStudy')})`
          : i18n.t('assessment.' + assessment)
      }
      </div>
      <PopoverControl items={allowedPopoverItems}>
        <div className={`nav__assessment-status status-${currentAssessmentStatus} actionable-${!R.isEmpty(allowedPopoverItems)}`}>
          <span>{i18n.t(`assessment.status.${currentAssessmentStatus}.label`)}</span>
          {
            !R.isEmpty(allowedPopoverItems)
            ? <Icon className="icon-white icon-middle" name="small-down"/>
            : null
          }
        </div>
      </PopoverControl>
      <button
        className="btn-s nav__assessment-toggle"
        onClick={() => props.toggleAllNavigationGroupsCollapse()}>
        {
          props.lastUncollapseState
            ? i18n.t('navigation.hideAll')
            : i18n.t('navigation.showAll')
        }
      </button>
    </div>
    {
      R.map(item =>
        <AssesmentSection
          key={item.label}
          countryIso={countryIso}
          item={item}
          assessment={assessment}
          i18n={i18n}
          {...props}/>
      , sections)
    }
  </div>
}

const AssesmentSection = ({countryIso, item, assessment, i18n, ...props}) => {
  const sectionCollapsedClass = props.navigationGroupCollapseState[assessment][item.sectionNo] ? 'nav__section-items--visible' : 'nav__section-items--hidden'

  return <div className="nav__section">
    <div className="nav__section-header" onClick={() => props.toggleNavigationGroupCollapse(assessment, item.sectionNo)}>
      <div className="nav__section-order">{item.sectionNo}</div>
      <div className="nav__section-label">{i18n.t(item.label)}</div>
    </div>
    <div className={sectionCollapsedClass}>
    {
      R.map(child => {
        const linkTo = getLinkTo(child.pathTemplate, countryIso)

        return <Link
          key={child.tableNo}
          className={`nav__section-item ${R.equals(props.path, linkTo) ? 'selected' : ''}`}
          to={linkTo}>
            <div className='nav__section-order'>{child.tableNo}</div>
            <div className='nav__section-label'>{i18n.t(child.label)}</div>
            <div className="nav__section-status-content">
              <ReviewStatus status={props.getReviewStatus(child.section)} />
            </div>
          </Link>
      }, item.children)
    }
    </div>
  </div>
}

const UsersManagement = ({i18n, countryIso, path, pathTemplate}) => {
  const linkTo = getLinkTo(pathTemplate, countryIso)

  return <Link
    className={`nav__link ${R.equals(path, linkTo) ? 'selected' : ''}`}
    to={linkTo}>
      <div className='nav__link-label'>{i18n.t('navigation.support.manageCollaborators')}</div>
    </Link>
}

const Footer = ({i18n, userInfo, countryIso, path}) => {
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
  return <div className="nav__footer">
    <a
      className="nav__footer-link"
      target="_top"
      href={`mailto:fra@fao.org?subject=${subject}&body=${body}`}>
      {i18n.t('navigation.support.sendFeedback')}
    </a>
    <span className="nav__footer-copyright">&copy; {currentYear} FAO</span>
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
    if (!this.props.navigationVisible) return null
    const status = R.defaultTo({}, this.props.status)
    const getReviewStatus = section => R.pipe(
      R.defaultTo({}),
      R.prop(section),
      R.defaultTo({issuesCount: 0})
    )(status.reviewStatus)

    const {userInfo, i18n, path, countries, country, changeAssessment, getCountryList} = this.props

    return <div className="fra-nav__container">
      <div className="fra-nav">
        <CountrySelection
          {...this.props}
          name={country}
          countries={countries}
          listCountries={getCountryList}
          role={roleLabel(country, userInfo, i18n)}
          />
        <div className="nav__scroll-content" ref="scroll_content" onScroll={() => {
          const content = ReactDOM.findDOMNode(this.refs.scroll_content)
          this.props.navigationScroll(content.scrollTop)
        }}>
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
          <Footer
            countryIso={country}
            {...this.props}/>
        </div>
      </div>
    </div>
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
  fetchAllCountryData,
  changeAssessment,
  navigationScroll,
  toggleNavigationGroupCollapse,
  toggleAllNavigationGroupsCollapse
})(Nav)
