import './style.less'

import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import { getCountryName } from '../country/actions'

import OverviewView from './views/overviewView'
import AboutView from './views/aboutView'
import RecentActivityView from './views/recentActivityView'

const sections = [
  {name: 'overview', component: OverviewView},
  {name: 'about', component: AboutView},
  {name: 'recentActivity', component: RecentActivityView},
  // {name: 'externalData', component: OverviewView}
]

class LandingView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {section: sections[0]}
  }

  render () {
    const countryIso = this.props.match.params.countryIso
    const {i18n, getCountryName, closeChat} = this.props

    return <LoggedInPageTemplate>
      <div className="fra-view__content">

        <div className="landing__page-header">
          <h1 className="landing__page-title">{getCountryName(countryIso, i18n.language)}</h1>
          <div className="landing__page-menu">
            {sections.map(s =>
              <button
                key={s.name}
                disabled={this.state.section.name === s.name}
                className="landing__page-menu-button"
                onClick={e => this.setState({section: s})}>
                {i18n.t(`landing.sections.${s.name}`)}
              </button>
            )}
          </div>
        </div>

        {React.createElement(this.state.section.component, {...this.props})}

      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  country: state.country
})

export default connect(mapStateToProps, {
  getCountryName
})(LandingView)
