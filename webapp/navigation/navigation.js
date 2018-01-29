import * as R from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Route from 'route-parser'
import { getRelativeDate } from '../utils/relativeDate'
import { Link } from '../reusableUiComponents/link'
import Icon from '../reusableUiComponents/icon'
import { follow } from './../router/actions'
import {
  changeAssessment,
  navigationScroll,
  toggleNavigationGroupCollapse,
  toggleAllNavigationGroupsCollapse
} from './actions'
import { getCountryList, getCountryName, isPanEuropeanCountry } from '../country/actions'
import { fetchAllCountryData } from '../app/actions'
import { assessments } from './items'
import { roleForCountry, getRoleLabelKey } from '../../common/countryRole'
import { allowedToChangeRoles } from '../../common/userManagementAccessControl'
import { hasOdps } from '../assessmentFra/extentOfForest/extentOfForestHelper'
import Assessment from './assessment'
import ReviewStatus from './reviewStatus'

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
    const {role, i18n, getCountryName} = this.props

    const style = {
      backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'`
    }

    return <div className="nav__country" ref="navCountryItem" onClick={() => {
      this.setState({isOpen: R.not(this.state.isOpen)})
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
          R.map(([role, roleCountries]) =>
            <CountryRole
              {...props}
              key={role}
              role={role}
              roleCountries={roleCountries}
            />
          )
        )(countries)
      }
    </div>
  </div>
}

const CountryRole = ({role, roleCountries, currentCountry, i18n, ...props}) =>
  console.log(roleCountries, role, props) ||
  <div className="nav__country-list-section">
    <div className="nav__country-list-header">
      <span className="nav__country-list-primary-col">{i18n.t(getRoleLabelKey(role))}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('countryListing.fra2020')}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('audit.edited')}</span>
    </div>
    {
      R.map(country =>
          <CountryRow
            {...props}
            key={country.countryIso}
            country={country}
            i18n={i18n}
            selectedCountry={currentCountry}
          />
        , roleCountries)
    }
  </div>

const CountryRow = ({selectedCountry, country, fetchAllCountryData, i18n, getCountryName}) => {
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

const SectionLink = ({i18n, countryIso, path, pathTemplate, label}) => {
  const linkTo = getLinkTo(pathTemplate, countryIso)

  return <Link
    className={`nav__link ${R.equals(path, linkTo) ? 'selected' : ''}`}
    to={linkTo}>
      <div className='nav__link-label'>{i18n.t(label)}</div>
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

  componentWillMount () {
    this.props.getCountryList()
  }

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

    const {userInfo, i18n, path, countries, country, changeAssessment, isPanEuropeanCountry} = this.props

    return <div className="fra-nav__container">
      {R.isNil(countries)
        ? null
        : <div className="fra-nav">
          <CountrySelection
            {...this.props}
            name={country}
            countries={countries}
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
            {
              this.props.showOriginalDataPoints
                ? <NationalData
                  label={i18n.t('nationalDataPoint.nationalData')}
                  countryIso={country}
                  status={R.merge(getReviewStatus('odp'), status.odpStatus)}
                  path={path}
                  pathTemplate="/country/:countryIso/odps"
                  secondaryPathTemplate="/country/:countryIso/odp"
                  userInfo={userInfo}/>
                : null
            }
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
            {
              isPanEuropeanCountry(country)
              ? <div>
                <div className="nav__divider"/>
                <SectionLink
                  countryIso={country}
                  i18n={i18n}
                  path={path}
                  pathTemplate="/country/:countryIso/panEuropeanIndicators"
                  label="navigation.sectionHeaders.panEuropeanIndicators"
                />
              </div>
              : null
            }
            <div className="nav__divider"/>
            {
              !R.isEmpty(allowedToChangeRoles(country, userInfo))
                ? <SectionLink
                  countryIso={country}
                  i18n={i18n}
                  path={path}
                  pathTemplate="/country/:countryIso/users"
                  label="navigation.support.manageCollaborators"
                />
                : null
            }
            <Footer
              countryIso={country}
              {...this.props}/>
          </div>
        </div>
      }
    </div>
  }
}

const mapStateToProps = state => ({
  showOriginalDataPoints: hasOdps(R.path(['extentOfForest', 'fra'], state)),
  ...state.navigation,
  ...state.country,
  ...state.router,
  ...state.user
})

export default connect(mapStateToProps, {
  follow,
  getCountryList,
  getCountryName,
  isPanEuropeanCountry,
  fetchAllCountryData,
  changeAssessment,
  navigationScroll,
  toggleNavigationGroupCollapse,
  toggleAllNavigationGroupsCollapse
})(Nav)
