import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import camelize from 'camelize'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'

import { fetchUsers } from '../../userManagement/actions'

class ContactPersonsPrintView extends React.Component {

  componentDidMount () {
    const countryIso = this.props.match.params.countryIso
    this.props.fetchUsers(countryIso, true)
  }

  render () {
    const { countryUsers, i18n } = this.props

    const users = countryUsers
      ? countryUsers.filter(u => u.active)
      : null

    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <div className="fra-view__content">
        <h2 className="headline">
          {i18n.t('contactPersons.reportPreparationAndContactPersons')}
        </h2>
        <div className="fra-description__preview">
          {i18n.t('contactPersons.contactPersonsSupport')}
        </div>

        {
          users ?
            <table className="fra-table">

              <thead>
              <tr>
                <th className="fra-table__header-cell">
                  {i18n.t('userManagement.name')}
                </th>
                <th className="fra-table__header-cell">
                  {i18n.t('editUser.role')}
                </th>
                <th className="fra-table__header-cell">
                  {i18n.t('userManagement.email')}
                </th>
                <th className="fra-table__header-cell">
                  {i18n.t('contactPersons.tables')}
                </th>
              </tr>
              </thead>

              <tbody>
              {
                users.map((u, i) => (
                  <tr key={i}>
                    <td className="fra-table__cell-left">
                      <div className="text-input__readonly-view">
                        {u.name}
                      </div>
                    </td>
                    <td className="fra-table__cell-left">
                      <div className="text-input__readonly-view">
                        {i18n.t(`user.roles.${camelize(u.role.toLowerCase())}`)}
                      </div>
                    </td>
                    <td className="fra-table__cell-left">
                      <div className="text-input__readonly-view">
                        {u.email}
                      </div>
                    </td>
                    <td className="fra-table__cell-left">
                      <div className="text-input__readonly-view">
                        {
                          u.tables && !R.isEmpty(u.tables) && u.tables[0].tableNo !== 'all'
                            ? u.tables.map(R.prop('tableNo')).join(', ')
                            : i18n.t('contactPersons.all')
                        }
                      </div>
                    </td>
                  </tr>
                ))
              }
              </tbody>


            </table>
            : null
        }
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  countryUsers: state.userManagement.countryUsers,
})

export default connect(mapStateToProps, { fetchUsers })(ContactPersonsPrintView)
