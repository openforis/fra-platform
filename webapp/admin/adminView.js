import React from 'react'
import { connect } from 'react-redux'

import NotFound from '../app/notfound'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'

import UsersManagementView from './components/usersManagementView'
import DataExportView from './components/dataExportView'

import { isAdministrator } from '../../common/countryRole'

const sections = [
  { name: 'usersManagementView', component: UsersManagementView, labelKey: 'landing.sections.userManagement' },
  { name: 'dataExportView', component: DataExportView, labelKey: 'landing.sections.dataExport' }
]

class AdminView extends React.Component {

  constructor (props) {
    super(props)
    this.state = { section: sections[0] }
  }

  isActiveSection (section) {
    return this.state.section.name === section.name
  }

  render () {
    const { userInfo, i18n } = this.props

    return isAdministrator(userInfo)
      ? <LoggedInPageTemplate>
        <div className="fra-view__content">

          <div className="landing__page-header">
            <h1 className="landing__page-title">{i18n.t('admin.admin')}</h1>

            <div className="landing__page-menu">
              {
                sections.map(section =>
                  <button key={section.name}
                          disabled={this.isActiveSection(section)}
                          className="landing__page-menu-button"
                          onClick={e => this.setState({ section })}>
                    {i18n.t(section.labelKey)}
                  </button>
                )
              }
            </div>

          </div>

          {
            React.createElement(this.state.section.component, { ...this.props })
          }

        </div>
      </LoggedInPageTemplate>
      : <NotFound/>
  }
}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  countryIso: props.match.params.countryIso,
})

export default connect(mapStateToProps)(AdminView)
