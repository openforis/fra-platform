import './DefaultEmptyList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

const DefaultEmptyList: React.FC = () => {
  const { t } = useTranslation()

  return <div className="table-paginated-empty-list">{t('common.noItemsFound')}</div>
}

export default DefaultEmptyList
