import './Header.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'

import Hr from 'client/components/Hr'
import Icon from 'client/components/Icon'
import MultiSelect from 'client/components/TablePaginated/Filters/MultiSelect'
import Text from 'client/components/TablePaginated/Filters/Text'
import { useRepositoryListContext } from 'client/pages/CountryHome/Repository/RepositoryList/context'
import { useFileTypeOptions } from 'client/pages/CountryHome/Repository/RepositoryList/hooks/_useFileTypeOptions'

import Breadcrumb from './Breadcrumb'
import ButtonAdd from './ButtonAdd'
import ButtonBack from './ButtonBack'
import ButtonDownloadAll from './ButtonDownloadAll'

type Props = {
  isGlobal?: boolean
}

const Header: React.FC<Props> = (props) => {
  const { isGlobal = false } = props
  const { t } = useTranslation()
  const { parentUuid } = useRepositoryListContext()
  const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=${isGlobal}`
  const fileTypeOptions = useFileTypeOptions(path)

  return (
    <div className="repository-header">
      <div className="repository-header__left">
        <ButtonBack />
        <ButtonDownloadAll isGlobal={isGlobal} />
        <Breadcrumb />
      </div>

      <div className="repository-header__right">
        <ButtonAdd isGlobal={isGlobal} parentUuid={parentUuid} />
        <ButtonAdd isFolder isGlobal={isGlobal} parentUuid={parentUuid} />
        <Icon name="filter" />
        <Hr vertical />
        <Text fieldName="name" label={t('common.name')} path={path} type={TablePaginatedFilterType.TEXT} />
        <MultiSelect
          fieldName="access"
          label={t('common.access')}
          multiLabelSummaryKey="common.access"
          options={[
            { label: t('common.public'), value: 'public' },
            { label: t('common.private'), value: 'private' },
          ]}
          path={path}
          type={TablePaginatedFilterType.MULTI_SELECT}
        />
        <MultiSelect
          fieldName="linked"
          label={t('common.linked')}
          multiLabelSummaryKey="common.linked"
          options={[
            { label: t('common.linked'), value: 'linked' },
            { label: t('common.unlinked'), value: 'unlinked' },
          ]}
          path={path}
          type={TablePaginatedFilterType.MULTI_SELECT}
        />
        <MultiSelect
          fieldName="fileType"
          label={t('common.fileType')}
          multiLabelSummaryKey="common.fileType"
          options={fileTypeOptions}
          path={path}
          type={TablePaginatedFilterType.MULTI_SELECT}
        />
      </div>
    </div>
  )
}

export default Header
