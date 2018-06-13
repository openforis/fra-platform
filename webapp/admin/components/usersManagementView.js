import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { fetchAllUsers } from '../../userManagement/actions'

import {
  alternateNationalCorrespondent,
  collaborator,
  nationalCorrespondent,
  reviewer
} from '../../../common/countryRole'

import { i18nUserRole } from '../../../common/userUtils'

const UsersCount = ({i18n, userCounts}) =>
  <div className="user-counts__container">
    {
      userCounts
        ? [
          nationalCorrespondent.role,
          alternateNationalCorrespondent.role,
          collaborator.role,
          reviewer.role
        ]
          .map(role =>
            <div key={role} className="user-counts__item">
              {`${userCounts[role]} ${i18nUserRole(i18n, role, Number(userCounts[role]))}`}
            </div>
          )
        : null
    }
  </div>

class UsersManagementView extends React.Component {

  componentDidMount () {
    this.props.fetchAllUsers()
  }

  render () {
    const {i18n, allUsers, userCounts} = this.props

    return <div>
      <UsersCount i18n={i18n} userCounts={userCounts}/>
    </div>
  }

}

const mapStateToProps = state =>
  ({
    i18n: state.user.i18n,
    allUsers: state.userManagement.allUsers,
    userCounts: state.userManagement.userCounts
  })

export default connect(mapStateToProps, {fetchAllUsers})(UsersManagementView)
