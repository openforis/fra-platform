import './Filters.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'

import Hr from 'client/components/Hr'
import Icon from 'client/components/Icon'
import Text from 'client/components/TablePaginated/Filters/Text'
import ButtonAdd from 'client/pages/CountryHome/Repository/ButtonAdd'
import ButtonDownloadAll from 'client/pages/CountryHome/Repository/ButtonDownloadAll'

type Props = {
  isGlobal?: boolean
}

const Filters: React.FC<Props> = (props) => {
  const { isGlobal = false } = props
  const { t } = useTranslation()
  const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=${isGlobal}`

  return (
    <div className="repository-filters">
      <ButtonDownloadAll isGlobal={isGlobal} />
      {/* TODO: Add Button ADD FILE */}
      {/* TODO: Add Button ADD FOLDER */}
      <ButtonAdd isGlobal={isGlobal} />
      <Hr vertical />
      <Icon name="sort-amount-asc" />
      <Text fieldName="name" label={t('common.name')} path={path} type={TablePaginatedFilterType.TEXT} />
      {/* TODO: Add ADDED */}
      {/* TODO: Add LINKED */}
      {/* TODO: Add ACCESS */}
    </div>
  )
}

export default Filters
