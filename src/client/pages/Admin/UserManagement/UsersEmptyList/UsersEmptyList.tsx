import './UsersEmptyList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { TablePaginatedEmptyListComponent } from 'client/components/TablePaginated'

const UsersEmptyList: TablePaginatedEmptyListComponent = () => {
  const { t } = useTranslation()

  return <div className="admin-user-management__empty-list">{t('common.noItemsToDisplay')}</div>
}

export default UsersEmptyList
