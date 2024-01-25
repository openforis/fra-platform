import './Repository.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Repository as RepositoryType } from 'meta/cycleData'

import Icon from 'client/components/Icon'
import TablePaginated, { Column } from 'client/components/TablePaginated'
import CreateFile from 'client/pages/CountryHome/FraHome/Repository/CreateFile'

const Link = ({ datum }: { datum: RepositoryType }) => {
  if (datum.link) {
    return <ReactRouterLink to={datum.link}>{datum.name}</ReactRouterLink>
  }

  return <ReactRouterLink to={ApiEndPoint.CycleData.Repository.file(datum.fileUuid)}>{datum.name}</ReactRouterLink>
}

const useColumns = (): Array<Column<RepositoryType>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<RepositoryType>>>(
    () => [
      {
        // Move to separate file
        component: ({ datum }) => {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          return <Link datum={datum} />
        },
        header: t('common.link'),
        key: 'link',
      },
      {
        component: () => (
          // Move to separate file
          <div className="actions">
            <Icon name="trash-simple" />
          </div>
        ),
        header: t('common.name'),
        key: 'name',
      },
    ],
    [t]
  )
}

const Repository: React.FC = () => {
  const { t } = useTranslation()

  const columns = useColumns()

  return (
    <div className="landing__page-repository">
      <div className="landing__page-container-header landing__repository-header">
        <h3>{t('landing.links.links')}</h3>
      </div>

      <div className="table-container">
        <TablePaginated
          header={false}
          counter={false}
          columns={columns}
          path={ApiEndPoint.CycleData.Repository.many()}
        />
      </div>
      <div />

      <div className="landing__page-container-header">
        <h3>{t('landing.links.repository')}</h3>
      </div>

      <div className="table-container">
        <TablePaginated
          header={false}
          counter={false}
          columns={columns}
          path={ApiEndPoint.CycleData.Repository.many()}
        />
      </div>

      <div className="landing__page-button-container">
        <CreateFile />
      </div>
    </div>
  )
}

export default Repository
