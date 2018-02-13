import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import { getCountryName } from '../country/actions'
import { isAllowedToChangeRole } from '../../common/userManagementAccessControl'

import OverviewView from './views/overviewView'
import AboutView from './views/aboutView'
import RecentActivityView from './views/recentActivityView'
import UserManagementView from '../userManagement/userManagementView'

class LandingView extends React.Component {

  getActiveSection (sections) {
    return R.pipe(
      R.defaultTo({}),
      R.prop('section'),
      R.defaultTo(sections[0])
    )(this.state)
  }

  isActiveSection (sections, section) {
    return this.getActiveSection(sections).name === section.name
  }

  getSections () {
    const {userInfo, match} = this.props
    const countryIso = match.params.countryIso

    const defaultSections = [
      {name: 'overview', component: OverviewView},
      {name: 'recentActivity', component: RecentActivityView},
      {name: 'about', component: AboutView}
    ]

    return isAllowedToChangeRole(countryIso, userInfo)
      ? R.insert(1, {name: 'userManagement', component: UserManagementView}, defaultSections)
      : defaultSections
  }

  render () {
    const {i18n, getCountryName, match} = this.props
    const countryIso = match.params.countryIso
    const sections = this.getSections()

    return <LoggedInPageTemplate>
      <div className="fra-view__content">

        <div className="landing__page-header">
          <h1 className="landing__page-title">{getCountryName(countryIso, i18n.language)}</h1>
          <div className="landing__page-menu">
            {sections.map(section =>
              <button
                key={section.name}
                disabled={this.isActiveSection(sections, section)}
                className="landing__page-menu-button"
                onClick={e => this.setState({section})}>
                {i18n.t(`landing.sections.${section.name}`)}
              </button>
            )}
          </div>
        </div>

        {React.createElement(this.getActiveSection(sections).component, {...this.props})}

      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  country: state.country
})

export default connect(mapStateToProps, {
  getCountryName
})(LandingView)
