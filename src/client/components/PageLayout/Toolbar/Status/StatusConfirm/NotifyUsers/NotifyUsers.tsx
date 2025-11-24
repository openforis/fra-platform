import './NotifyUsers.scss'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryStatus } from 'meta/area/countryStatus'
import { Users } from 'meta/user/users'

import { useUser } from 'client/store/user/hooks/user'
import ButtonCheckbox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'
import TablePaginated from 'client/components/TablePaginated'
import { useTablePaginatedBodyData } from 'client/components/TablePaginated/Body/hooks/useTablePaginatedBodyData'

import { useColumns } from './hooks/useColumns'
import { useCompareFn } from './hooks/useCompareFn'
import { useFilterFn } from './hooks/useFilterFn'

type Props = {
  notifyUsers: boolean
  setNotifyUsers: Dispatch<SetStateAction<boolean>>
  status: StatusTransition
}

const path = `${ApiEndPoint.User.many()}#recipients`

const NotifyUsers: React.FC<Props> = (props) => {
  const { notifyUsers, setNotifyUsers, status } = props

  const { t } = useTranslation()
  const user = useUser()
  const columns = useColumns()
  const compareFn = useCompareFn()
  const filterFn = useFilterFn({ status })
  const recipients = useTablePaginatedBodyData({ filterFn, path })

  const show = status.status !== CountryStatus.approval && Users.isAdministrator(user) && !Objects.isEmpty(recipients)

  return (
    <div className={classNames('assessment-status-confirm__notify-users', { hidden: !show })}>
      <ButtonCheckbox
        checked={!notifyUsers}
        label={t('navigation.doNotNotifyUsers')}
        onClick={(): void => setNotifyUsers(!notifyUsers)}
        variant={ButtonCheckboxVariant.checkbox}
      />
      <TablePaginated
        className={classNames({ 'table-dont-notify-users': !notifyUsers })}
        columns={columns}
        compareFn={compareFn}
        counter={{ show: false }}
        filterFn={filterFn}
        path={path}
      />
    </div>
  )
}

export default NotifyUsers
