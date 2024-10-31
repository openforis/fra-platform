import './UserInvitations.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { UserInvitations as UserInvitationMeta, UserInvitationSummary, Users } from 'meta/user'

import TablePaginated, { Column } from 'client/components/TablePaginated'

import Buttons from './Buttons'
import Info from './Info'
import Invite from './Invite'

const useColumns = (): Array<Column<UserInvitationSummary>> => {
  const { t } = useTranslation()

  const className = 'invitation'

  return useMemo<Array<Column<UserInvitationSummary>>>(
    () => [
      {
        header: '',
        key: 'info',
        component: ({ datum }) => <Info userInvitation={datum} />,
      },
      {
        component: ({ datum }) => (
          <span className={classNames(className, { expired: UserInvitationMeta.isExpired(datum) })}>{datum.name}</span>
        ),
        header: t('common.name'),
        key: 'name',
        orderByProperty: 'u.name',
      },
      {
        component: ({ datum }) => (
          <span className={classNames(className, { expired: UserInvitationMeta.isExpired(datum) })}>
            {t(Users.getI18nRoleLabelKey(datum.role))}
          </span>
        ),
        header: t('common.role'),
        key: 'role',
        orderByProperty: 'role',
      },
      {
        component: ({ datum }) => (
          <span className={classNames(className, { expired: UserInvitationMeta.isExpired(datum) })}>{datum.email}</span>
        ),
        header: t('common.email'),
        key: 'email',
        orderByProperty: 'u.email',
      },
      {
        header: '',
        key: 'actions',
        component: ({ datum }) => <Buttons invitationSummary={datum} />,
      },
    ],
    [t]
  )
}

const UserInvitations: React.FC = () => {
  const columns = useColumns()

  const len = columns.length - 1
  const gridTemplateColumns = `32px repeat(${len}, auto)`

  return (
    <div className="user-invitations">
      <Invite />
      <TablePaginated
        columns={columns}
        counter={{ show: false }}
        gridTemplateColumns={gridTemplateColumns}
        path={ApiEndPoint.User.invitations()}
      />
    </div>
  )
}

export default UserInvitations
