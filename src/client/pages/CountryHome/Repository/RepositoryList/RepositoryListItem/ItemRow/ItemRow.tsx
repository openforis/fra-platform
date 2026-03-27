import './ItemRow.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Dates } from 'utils/dates'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

import RepositoryLink from '../RepositoryLink'

export type Props = {
  depth: number
  item: RepositoryItemTree
}

const ItemRow: React.FC<Props> = (props) => {
  const { depth, item } = props

  const { t } = useTranslation()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const openPanel = useOpenPanel({ repositoryItem: item })

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem: item })
  const withActions = isGlobalRepositoryItem ? isGlobalRepositoryEditable : isCountryRepositoryEditable
  const level = item.props?.public ? 'public' : 'private'

  return (
    <div className="repository-list-item">
      <div style={{ paddingLeft: depth * 20 + 20 }}>
        <RepositoryLink datum={item} />
      </div>
      <div className="repository-list-item__created-at">{Dates.getRelativeDate(item.createdAt, t)}</div>
      <div className={classNames('repository-list-item__badge', { linked: item.linked, unlinked: !item.linked })}>
        {t(`common.${item.linked ? 'linked' : 'unlinked'}`)}
      </div>
      <div className={classNames('repository-list-item__badge', level)}>{t(`common.${level}`)}</div>
      {withActions ? (
        <Button iconName="pencil" inverse label={t('description.edit')} onClick={openPanel} size={ButtonSize.xs} />
      ) : (
        <div />
      )}
    </div>
  )
}

export default ItemRow
