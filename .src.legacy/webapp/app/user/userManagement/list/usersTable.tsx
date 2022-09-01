import React from 'react'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import { administrator, collaborator, getRoleLabelKey } from '@common/countryRole'
import UsersTableCSVExportButton from './usersTableCVS'
import MultiSelect from './collaboratorsTableMultiSelect'

import { getFilterRoles } from './filter'

const UsersTable = ({ users, i18n, isAdminTable = false, ...props }: any) =>
  users ? (
    <table className="user-list__table">
      <UsersTableHeadRow i18n={i18n} users={users} isAdminTable={isAdminTable} {...props} />

      <tbody>
        {users.length > 0 ? (
          users.map((user: any, i: any) => (
            <UserRow key={i} i18n={i18n} user={user} isAdminTable={isAdminTable} {...props} />
          ))
        ) : (
          <NoUsersRow i18n={i18n} />
        )}
      </tbody>
    </table>
  ) : null

const UsersTableHeadRow = ({ users, i18n, isAdminTable, filter = {}, ...props }: any) => (
  <thead>
    <tr>
      <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
      {isAdminTable ? (
        getFilterRoles(filter).map((role: any) => (
          <th key={role} className="user-list__header-cell">
            {i18n.t(getRoleLabelKey(role))}
          </th>
        ))
      ) : (
        <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
      )}
      {isAdminTable ? null : <th className="user-list__header-cell">{i18n.t('userManagement.tableAccess')}</th>}
      <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
      {isAdminTable ? null : <th className="user-list__header-cell">{i18n.t('userManagement.loginEmail')}</th>}
      <th className="user-list__header-cell user-list__edit-column">
        <UsersTableCSVExportButton {...props} i18n={i18n} users={users} isAdminTable={isAdminTable} filter={filter} />
      </th>
    </tr>
  </thead>
)

const NoUsersRow = ({ i18n }: any) => (
  <tr>
    <td className="user-list__cell" colSpan={5}>
      <div className="user-list__cell--read-only">{i18n.t('userManagement.noUsers')}</div>
    </td>
  </tr>
)

type UserRowState = any
type Props = any

class UserRow extends React.Component<{}, UserRowState> {
  props: Props
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      countryIso,
      i18n,
      user,
      removeUser,
      onEditClick,
      userInfo,
      isAdminTable,
      filter,
      persistCollaboratorCountryAccess,
    } = this.props

    const rowClassName = user.invitationUuid
      ? 'user-list__invitation-row'
      : user.active
      ? ''
      : 'user-list__inactive-user'
    return (
      <tr className={rowClassName}>
        <UserColumn user={user} field="name" />

        {isAdminTable ? (
          getFilterRoles(filter).map((role: any) => (
            <UserRoleColumn
              user={user}
              i18n={i18n}
              lang={userInfo.lang}
              isAdminTable={isAdminTable}
              key={role}
              role={role}
            />
          ))
        ) : (
          <UserRoleColumn user={user} i18n={i18n} isAdminTable={isAdminTable} lang={userInfo.lang} />
        )}

        {isAdminTable ? null : (
          <UserTableAccessColumn
            user={user}
            i18n={i18n}
            countryIso={countryIso}
            persistCollaboratorCountryAccess={persistCollaboratorCountryAccess}
          />
        )}

        <UserColumn user={user} field="email" />

        {isAdminTable ? null : <UserColumn user={user} field="loginEmail" />}

        <td className="user-list__cell user-list__edit-column">
          {
            // pending users cannot be edited
            user.invitationUuid ? (
              [
                <button key={0} className="btn-s btn-link" onClick={() => this.setState({ showInvitationInfo: true })}>
                  {i18n.t('userManagement.info')}
                </button>,
                <button
                  key={1}
                  className="btn-s btn-link-destructive"
                  disabled={userInfo.id === user.id}
                  onClick={() =>
                    window.confirm(i18n.t('userManagement.confirmDelete', { user: user.name }))
                      ? removeUser(countryIso, user, isAdminTable)
                      : null
                  }
                >
                  {i18n.t('userManagement.remove')}
                </button>,
              ]
            ) : (
              <button className="btn-s btn-link" onClick={() => onEditClick(user.id)}>
                {i18n.t('userManagement.edit')}
              </button>
            )
          }

          {this.state.showInvitationInfo ? (
            <UserInvitationInfo {...this.props} onClose={() => this.setState({ showInvitationInfo: null })} />
          ) : null}
        </td>
      </tr>
    )
  }
}

const UserInvitationInfo = ({ i18n, countryIso, user, sendInvitationEmail, onClose }: any) => (
  <div className="user-list__invitation-info">
    <div>
      <div>
        {i18n.t('userManagement.invitationLink')}: {user.invitationLink}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn-s btn-link"
          onClick={() => {
            sendInvitationEmail(countryIso, user.invitationUuid)
            onClose()
          }}
        >
          {i18n.t('userManagement.sendInvitation')}
        </button>
      </div>
    </div>
    <a onClick={onClose}>
      <Icon name="remove" className="icon-close" />
    </a>
  </div>
)

const UserColumn = ({ user, field }: any) => (
  <td className="user-list__cell">
    <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
  </td>
)

const UserRoleColumn = ({ i18n, user, role = null, isAdminTable }: any) => {
  const roleLabel = (userRole: any) => i18n.t(getRoleLabelKey(userRole.role))

  const invitationColumnValue = (user: any) =>
    isAdminTable ? (user.role === role ? i18n.t(`area.${user.countryIso}.listName`) : null) : roleLabel(user)

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">
        {user.invitationUuid
          ? invitationColumnValue(user)
          : isAdminTable
          ? R.pipe(
              R.filter((userRole: any) => (role ? userRole.role === role : role)),
              R.map((userRole: any) =>
                userRole.role === administrator.role
                  ? roleLabel(userRole)
                  : i18n.t(`area.${userRole.countryIso}.listName`)
              ),
              R.join(', ')
            )(user.roles)
          : roleLabel(user)}
      </div>
    </td>
  )
}

const UserTableAccessColumn = ({ i18n, countryIso, user, persistCollaboratorCountryAccess }: any) => {
  return (
    <td className="user-list__cell">
      {user.role === collaborator.role ? (
        <MultiSelect
          i18n={i18n}
          values={user.tables || undefined}
          onChange={(values: any) => {
            persistCollaboratorCountryAccess(countryIso, user.id, values)
          }}
        />
      ) : (
        '-'
      )}
    </td>
  )
}

export default UsersTable
